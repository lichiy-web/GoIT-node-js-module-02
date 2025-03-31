export const parseNumber = (num, defaultNum) =>
  (typeof num === 'string' && parseInt(num)) || defaultNum;

export const parsePaginationParams = query => {
  const { page, perPage } = query;

  const parsedPage = parseNumber(page, 1);
  const parsedPerPage = parseNumber(perPage, 10);

  return {
    page: parsedPage,
    perPage: parsedPerPage,
  };
};
