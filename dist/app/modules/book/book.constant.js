"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRelationalFieldsMapper = exports.bookRelationalFields = exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = [
    'title',
    'author',
    'genre',
    'publicationDate',
];
exports.bookFilterableFields = [
    'searchTerm',
    'categoryId',
    'minPrice',
    'maxPrice',
];
exports.bookRelationalFields = ['categoryId'];
exports.bookRelationalFieldsMapper = {
    categoryId: 'category',
};
