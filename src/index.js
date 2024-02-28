import { readFileSync } from 'fs';
import path from 'path';
import switchParser from './parsers.js';
import switchFormat from './formatters/index.js';
import createDiff from './createDiff.js';

const getData = (filepath) => readFileSync(filepath, 'utf-8');
const getFormat = (filepath) => path.extname(filepath);

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = switchParser(getData(filepath1), getFormat(filepath1));
  const data2 = switchParser(getData(filepath2), getFormat(filepath2));
  return switchFormat(createDiff(data1, data2), formatName);
};

export default genDiff;
