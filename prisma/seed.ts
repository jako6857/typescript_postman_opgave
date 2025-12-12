import bcrypt from "bcrypt";
import { prisma } from "../src/prisma";

const main = async () => {
  console.log("Starting seed...");


  await prisma.cartlines.deleteMany();
  await prisma.userRatings.deleteMany();
  await prisma.genrePosterRel.deleteMany();
  await prisma.user.deleteMany();
  await prisma.posters.deleteMany();
  await prisma.genres.deleteMany();


  const genres = await prisma.genres.createMany({
    data: [
      { title: "Drama", slug: "drama" },
      { title: "Musik", slug: "musik" },
      { title: "Thriller", slug: "thriller" },
      { title: "Børne - Familiefilm", slug: "boerne-familiefilm" },
      { title: "Science fiction", slug: "science-fiction" },
      { title: "Komedie", slug: "komedie" },
      { title: "Action", slug: "action" },
      { title: "Western", slug: "western" },
      { title: "Adventure", slug: "adventure" }
    ],
  });

  console.log("Genres seeded:", genres);

const posters = await prisma.posters.createMany({
  data: [
    {
      name: "Star Wars: A New Hope",
      slug: "star-wars-a-new-hope",
      description: "Classic sci-fi movie poster.",
      image: "https://example.com/sw1.jpg",
      width: 24,
      height: 36,
      price: 149.99,
      stock: 20
    },
    {
      name: "The Matrix",
      slug: "the-matrix",
      description: "Green code raining poster.",
      image: "https://example.com/matrix.jpg",
      width: 24,
      height: 36,
      price: 129.99,
      stock: 15
    },
    {
      name: "Interstellar",
      slug: "interstellar",
      description: "Space exploration poster.",
      image: "https://example.com/interstellar.jpg",
      width: 24,
      height: 36,
      price: 159.99,
      stock: 10
    }
  ]
});

console.log("Posters seeded:", posters);

  const testUser = await prisma.user.create({
    data: {
      firstname: "Test",
      lastname: "Bruger",
      email: "test@example.com",
      password: await bcrypt.hash("password", 10),
      role: "USER",
      isActive: true,
    },
  });

  console.log("Test user seeded:", testUser);

  console.log("SEEDING COMPLETED");
};

main()
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });
