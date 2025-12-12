import path from 'path';
import bcrypt from 'bcrypt';
import { readdir, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse/sync';
import { fieldTypes } from './types';
import { prisma } from '../src/prisma';


const seedOrder = [
  'genres',
  'posters',
  'genrePosterRel',
  'user',
  'userRatings',
  'cartlines'
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dir = path.join(__dirname, 'csv');

async function main() {
  console.log("Starting CSV seed...");

  await prisma.cartlines.deleteMany();
  await prisma.userRatings.deleteMany();
  await prisma.genrePosterRel.deleteMany();
  await prisma.user.deleteMany();
  await prisma.posters.deleteMany();
  await prisma.genres.deleteMany();
  console.log("Tables cleared");

  const csvFiles = (await readdir(dir)).filter(f => f.endsWith('.csv'));

  for (const model of seedOrder) {
    const csvFileName = `${model}.csv`;
    if (!csvFiles.includes(csvFileName)) continue;

    const raw = parse(await readFile(path.join(dir, csvFileName), 'utf-8'), {
      columns: true,
      skip_empty_lines: true
    });

    const data = await Promise.all(raw.map((row: any) => cast(model, row)));

    switch (model) {
      case 'genrePosterRel':
        await seedGenrePosterRel(data);
        break;
      case 'userRatings':
        await seedUserRatings(data);
        break;
      case 'cartlines':
        await seedCartlines(data);
        break;
      default:
        await seedModel(model, data);
    }

    console.log(`${model} seeded: ${data.length} records`);
  }
}

async function seedModel(model: string, data: any[]) {
  const uniqueField = model === 'posters' || model === 'genres' ? 'slug' : 'id';

  for (const row of data) {
    const where = { [uniqueField]: row[uniqueField] };
    await (prisma as any)[model].upsert({
      where,
      create: row,
      update: row
    });
  }
}

async function seedGenrePosterRel(data: any[]) {
  const missingSlugs: string[] = [];

  for (const row of data) {
    const poster = await prisma.posters.findUnique({
      where: { slug: row.posterSlug }
    });

    const genreExists = await prisma.genres.findUnique({
      where: { id: Number(row.genreId) }
    });

    if (!poster || !genreExists) {
      missingSlugs.push(row.posterSlug);
      continue; 
    }

    const where = {
      genreId_posterId: {
        genreId: Number(row.genreId),
        posterId: poster.id
      }
    };

    const createData = {
      genreId: Number(row.genreId),
      posterId: poster.id
    };

    await prisma.genrePosterRel.upsert({
      where,
      create: createData,
      update: createData
    });
  }

  if (missingSlugs.length > 0) {
    console.log(`Skipped ${missingSlugs.length} genrePosterRel records: missing posterSlugs`);
    console.log(`Example missing slugs: ${missingSlugs.slice(0, 10).join(', ')}`);
  }
}


async function seedUserRatings(data: any[]) {
  const users = await prisma.user.findMany();
  const posters = await prisma.posters.findMany();

  const userSet = new Set(users.map(u => u.id));
  const posterSet = new Set(posters.map(p => p.id));

  const recordsToInsert = [];

  for (const row of data) {
    const userId = Number(row.userId);
    const posterId = Number(row.posterId);
    const numStars = Number(row.numStars);

    if (!userSet.has(userId) || !posterSet.has(posterId)) continue;

    recordsToInsert.push({ userId, posterId, numStars });
  }

  if (recordsToInsert.length > 0) {
    await prisma.userRatings.createMany({
      data: recordsToInsert,
      skipDuplicates: true
    });
  }
}

async function seedCartlines(data: any[]) {
  const users = await prisma.user.findMany();
  const posters = await prisma.posters.findMany();

  const userSet = new Set(users.map(u => u.id));
  const posterSet = new Set(posters.map(p => p.id));

  const recordsToInsert = [];

  for (const row of data) {
    const userId = Number(row.userId);
    const posterId = Number(row.posterId);
    const quantity = Number(row.quantity);

    if (!userSet.has(userId) || !posterSet.has(posterId)) continue;

    recordsToInsert.push({ userId, posterId, quantity });
  }

  if (recordsToInsert.length > 0) {
    await prisma.cartlines.createMany({
      data: recordsToInsert,
      skipDuplicates: true
    });
  }
}

async function cast(model: string, row: any) {
  const types = fieldTypes[model];
  const out: any = {};

  for (const key in row) {
    const val = row[key]?.toString().trim();
    const type = types[key];

    if (key === 'password') out[key] = await bcrypt.hash(val, 10);
    else if (type === 'number') out[key] = Number(val);
    else if (type === 'boolean') out[key] = val !== '0';
    else if (type === 'date') out[key] = val ? new Date(val) : null;
    else out[key] = val ?? null;
  }

  return out;
}

main()
  .then(() => {
    console.log('Seed completed successfully');
    prisma.$disconnect();
  })
  .catch((err) => {
    console.error('Seed failed:', err);
    prisma.$disconnect();
    process.exit(1);
  });
