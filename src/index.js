import { readFileSync } from 'fs';

const getData = (filePath) => readFileSync(filePath);

const genDiff = (filePath1, filePath2) => {
  const data1 = JSON.parse(getData(filePath1));
  const data2 = JSON.parse(getData(filePath2));
  return {...data1, ...data2}
}

export default genDiff;




