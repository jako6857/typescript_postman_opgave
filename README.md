# WallyWood - Movie Poster API

A TypeScript-based REST API for managing movie posters, genres, users, and related data. Built with Express.js, Prisma ORM, and MySQL.

## Project Overview

WallyWood is a comprehensive API system for managing a movie poster shop. It includes features for:
- User authentication and authorization
- Poster management (CRUD operations)
- Genre management and genre-poster relationships
- Car/product inventory management
- User ratings and shopping cart functionality

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL with Prisma ORM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Data Parsing**: csv-parse for CSV imports
- **Development**: tsx for TypeScript execution

## Prerequisites

- Node.js (v18 or higher)
- MySQL database
- npm or yarn package manager

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd Typescriptopgave
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```env
DATABASE_URL="mysql://username:password@localhost:3306/WollyWood"
JWT_SECRET="your-secret-key-here"
PORT=4000
```

4. **Set up the database**
```bash
npm run prisma:migrate
```

5. **Seed the database**
```bash
npm run prisma:seed
```

## Available Scripts

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run the built application
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:seed` - Seed the database with initial data

## Project Structure

```
src/
├── index.ts                 # Main server entry point
├── prisma.ts               # Prisma client instance
├── controllers/            # Route handlers
│   ├── authController.ts
│   ├── cartlineController.ts
│   ├── genreController.ts
│   ├── genrePosterRelController.ts
│   ├── loginController.ts
│   ├── posterController.ts
│   ├── userController.ts
│   └── userRatingController.ts
├── middleware/             # Express middleware
│   ├── authenticateToken.ts
│   └── authorizeRole.ts
├── routes/                 # API route definitions
│   ├── authRoutes.ts
│   ├── cartlineRoutes.ts
│   ├── genrePosterRelRoutes.ts
│   ├── genreRoutes.ts
│   ├── loginRoutes.ts
│   ├── posterRoutes.ts
│   ├── userRatingRoutes.ts
│   └── userRoutes.ts
└── services/              # Business logic services
    ├── genreServices.ts
    ├── loginUser.ts
    └── posterService.ts

prisma/
├── schema.prisma          # Database schema definition
├── seed.ts                # Manual seed script
├── seedCSV.ts             # CSV-based seed script
├── types.ts               # Type definitions for CSV seeding
└── csv/                   # CSV data files
    ├── user.csv
    ├── brand.csv
    ├── category.csv
    ├── fueltype.csv
    ├── car.csv
    ├── genre (1).csv
    ├── poster.csv
    ├── genrePosterRel.csv
    └── ...
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/login` - User login

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get specific user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Posters
- `GET /api/posters` - Get all posters
- `GET /api/posters/:id` - Get specific poster
- `POST /api/posters` - Create new poster
- `PUT /api/posters/:id` - Update poster
- `DELETE /api/posters/:id` - Delete poster

**POST Poster Example:**
```json
{
  "name": "The Shawshank Redemption",
  "slug": "the-shawshank-redemption",
  "description": "Two imprisoned men bond over a number of years...",
  "image": "https://example.com/poster.jpg",
  "width": 500,
  "height": 750,
  "price": 299.99,
  "stock": 10
}
```

### Genres
- `GET /api/genres` - Get all genres
- `GET /api/genres/:id` - Get specific genre
- `POST /api/genres` - Create new genre
- `PUT /api/genres/:id` - Update genre
- `DELETE /api/genres/:id` - Delete genre

**POST Genre Example:**
```json
{
  "title": "Action",
  "slug": "action"
}
```

### Genre-Poster Relationships
- `GET /api/genre-posters` - Get all genre-poster relations
- `POST /api/genre-posters` - Add genre to poster
- `PUT /api/genre-posters/:id` - Update genre-poster relation
- `DELETE /api/genre-posters` - Delete genre-poster relation

**POST Genre-Poster Example:**
```json
{
  "genreId": 1,
  "posterId": 1
}
```

**PUT Genre-Poster Example:**
```json
{
  "oldGenreId": 15,
  "oldPosterId": 5405,
  "newGenreId": 1,
  "newPosterId": 5405
}
```

### Cars
- `GET /api/cars` - Get all cars
- `GET /api/cars/:id` - Get specific car
- `POST /api/cars` - Create new car
- `PUT /api/cars/:id` - Update car
- `DELETE /api/cars/:id` - Delete car

### Cartlines
- `GET /api/cartlines` - Get all cart items
- `POST /api/cartlines` - Add item to cart
- `PUT /api/cartlines/:id` - Update cart item
- `DELETE /api/cartlines/:id` - Remove from cart

### User Ratings
- `GET /api/ratings` - Get all ratings
- `POST /api/ratings` - Create new rating
- `PUT /api/ratings/:id` - Update rating
- `DELETE /api/ratings/:id` - Delete rating

## Database Schema

### Users
- `id`: Primary key
- `firstname`: User's first name
- `lastname`: User's last name
- `email`: Unique email address
- `password`: Hashed password
- `role`: USER or ADMIN
- `isActive`: Account status
- `createdAt`: Creation timestamp

### Posters
- `id`: Primary key
- `name`: Poster title
- `slug`: URL-friendly identifier
- `description`: Poster description
- `image`: Image URL
- `width`: Image width
- `height`: Image height
- `price`: Price in currency
- `stock`: Available quantity
- `createdAt`, `updatedAt`: Timestamps

### Genres
- `id`: Primary key
- `title`: Genre name
- `slug`: URL-friendly identifier
- `createdAt`, `updatedAt`: Timestamps

### Genre-Poster Relationships
- `genreId`: Foreign key to genres
- `posterId`: Foreign key to posters
- Composite primary key: (genreId, posterId)

### Cars
- `id`: Primary key
- `model`: Car model name
- `year`: Manufacturing year
- `price`: Price
- `brandId`: Foreign key to brands
- `categoryId`: Foreign key to categories
- `fueltypeId`: Foreign key to fuel types

## Authentication

The API uses JWT-based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

### User Roles
- **USER**: Standard user access
- **ADMIN**: Administrative access

## Database Seeding

### Option 1: CSV-Based Seeding (Recommended)
```bash
npm run prisma:seed
```

This uses `seedCSV.ts` which reads data from CSV files in the `prisma/csv/` directory. Supported models:
- users
- brands
- categories
- fuelType
- cars
- genres
- posters
- genrePosterRel

### Option 2: Manual Seeding
Edit `prisma/seed.ts` with hardcoded data and run:
```bash
npx prisma db seed
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200`: Success
- `201`: Created
- `204`: No Content (successful DELETE)
- `400`: Bad Request
- `404`: Not Found
- `500`: Server Error

Error responses include an error message:
```json
{
  "error": "Description of what went wrong"
}
```

## Development

1. **Start the development server**
```bash
npm run dev
```

The server runs on `http://localhost:4000` by default.

2. **Use Postman or similar tool** to test the endpoints

3. **Check the console** for detailed error logs and debugging information

## Security Notes

- Passwords are hashed using bcrypt with a salt round of 10
- JWT tokens should be kept secure and not exposed in logs
- Sensitive environment variables should never be committed to version control
- Always validate and sanitize user input
- Use HTTPS in production

## Production Deployment

1. Build the project
```bash
npm run build
```

2. Set production environment variables
3. Run the compiled application
```bash
npm start
```

4. Use a process manager like PM2 for reliability
5. Set up a reverse proxy (nginx/Apache)
6. Enable HTTPS with SSL certificates

## Troubleshooting

### Database Connection Issues
- Verify MySQL is running
- Check DATABASE_URL in .env
- Ensure database exists and credentials are correct

### Seed Script Fails
- Check CSV files are in `prisma/csv/` directory
- Verify CSV format matches expected structure
- Check console logs for specific error messages

### JWT Token Errors
- Ensure JWT_SECRET is set in .env
- Check token hasn't expired
- Verify token format in Authorization header

### Port Already in Use
- Change PORT in .env
- Or kill the process using port 4000

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Create a pull request

## License

ISC

## Support

For issues or questions, check the console logs for detailed error messages or contact the development team.
