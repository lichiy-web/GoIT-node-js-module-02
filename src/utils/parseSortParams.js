import { SORT_ORDER } from '../constants/index.js';
import { getCollectionKeysOf } from './getCollectionKeysOf.js';

const parseSortOrder = sortOrder =>
  ([SORT_ORDER.ASC, SORT_ORDER.DESC].includes(sortOrder) && sortOrder) ||
  SORT_ORDER.ASC;

const parseSortBy = (sortBy, schema) =>
  (getCollectionKeysOf(schema).includes(sortBy) && sortBy) || '_id';

export const parseSortParams = (query, collection) => {
  const { sortOrder, sortBy } = query;

  const parsedSortOrder = parseSortOrder(sortOrder);
  const parsedSortBy = parseSortBy(sortBy, collection);

  return {
    sortOrder: parsedSortOrder,
    sortBy: parsedSortBy,
  };
};
