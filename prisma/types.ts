export const fieldTypes: Record<string, Record<string, 'string' | 'number' | 'boolean' | 'date'>> = {
  posters: {
  id: 'number',
  name: 'string',
  slug: 'string',
  description: 'string',
  image: 'string',
  width: 'number',
  height: 'number',
  price: 'number',
  stock: 'number',
  createdAt: 'date',
  updatedAt: 'date'
},

genrePosterRel: {
  genreId: 'number',
  posterId: 'number'
},

  user: {
    id: 'number',
    firstname: 'string',
    lastname: 'string',
    email: 'string',
    password: 'string',
    role: 'string',
    isActive: 'boolean'
  },

  genres: {
    id: 'number',
    title: 'string',
    slug: 'string',
    createdAt: 'date',
    updatedAt: 'date'
  }
};
