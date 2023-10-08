import { Categories } from './enums';

export const PAGINATION_CURRENT_PAGE = 1;
export const PAGINATION_LIMIT = 10;

export const CATEGORIES_OPTIONS = [
  {
    value: Categories.FICTION,
    label: 'Fiction',
  },
  {
    value: Categories['NON-FICTION'],
    label: 'Non Fiction',
  },
  {
    value: Categories.BIOGRAPHY,
    label: 'Biography',
  },
];
