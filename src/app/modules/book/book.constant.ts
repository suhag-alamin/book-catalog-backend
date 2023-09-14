export const bookSearchableFields = [
  'title',
  'author',
  'genre',
  'publicationDate',
];

export const bookFilterableFields = [
  'searchTerm',
  'categoryId',
  'minPrice',
  'maxPrice',
];

export const bookRelationalFields = ['categoryId'];

export const bookRelationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};
