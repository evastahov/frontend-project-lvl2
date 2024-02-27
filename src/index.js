import { readFileSync } from 'fs';
import path from 'path';
import switchParser from './parsers.js';
import switchFormat from './formatters/index.js';
import createDiff from './createDiff.js';

const getData = (filePath) => readFileSync(filePath, 'utf-8');
const getFormat = (filePath) => path.extname(filePath);

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = switchParser(getData(filePath1), getFormat(filePath1));
  const data2 = switchParser(getData(filePath2), getFormat(filePath2));
  return switchFormat(createDiff(data1, data2), formatName);
};

export default genDiff;
