import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';
import parser from './parsers.js';

const getData = (filePath) => readFileSync(filePath, 'utf-8');
const getFormat = (filePath) => path.extname(filePath);

const genDiff = (filePath1, filePath2) => {
  const data1 = parser(getData(filePath1), getFormat(filePath1));
  const data2 = parser(getData(filePath2), getFormat(filePath2));
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  const result = keys.map((key) => {
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return data1[key] === data2[key]
        ? `    ${key}: ${data1[key]}`
        : `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    } if (Object.hasOwn(data1, key)) {
      return `  - ${key}: ${data1[key]}`;
    } if (Object.hasOwn(data2, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    return result;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
