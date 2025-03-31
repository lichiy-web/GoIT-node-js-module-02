import { studentsSchema } from '../db/models/student.js';
import { parseNumber } from './parsePaginationParams.js';

const parseParam = (param, value, schema, defaultValue) => {
  const isValidType =
    Object.getPrototypeOf(value) === schema.tree?.[param]?.type?.prototype;
  const enumValue = schema.tree?.[param]?.enum;
  return (
    (isValidType && (enumValue ? enumValue.includes(value) : true) && value) ||
    defaultValue
  );
};

export const parseGender = gender =>
  parseParam('gender', gender, studentsSchema);

console.log(`parseGender("male") = `, parseGender('123'));

console.log('parseName = ', parseParam('name', 'Ivan', studentsSchema));

export const parseFilterParams = query => {
  const { gender, maxAge, minAge, maxAvgMark, minAvgMark } = query;

  const parsedGender = parseGender(gender);
  const parsedMaxAge = parseNumber(maxAge);
  const parsedMinAge = parseNumber(minAge);
  const parsedMaxAvgMark = parseNumber(maxAvgMark);
  const parsedMinAvgMark = parseNumber(minAvgMark);

  return {
    gender: parsedGender,
    maxAge: parsedMaxAge,
    minAge: parsedMinAge,
    maxAvgMark: parsedMaxAvgMark,
    minAvgMark: parsedMinAvgMark,
  };
};
