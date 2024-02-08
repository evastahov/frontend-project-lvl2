import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import { test, expect } from '@jest/globals';

const __filename = fileURLToPath((import.meta.url));
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  expect(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toEqual(readFile('result.txt'));
});

// console.log(genDiff(getFixturePath('file1.json'), getFixturePath('file2.json')));
// console.log(readFile('result.txt'));
