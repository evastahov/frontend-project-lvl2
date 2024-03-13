import _ from 'lodash';

const createIndent = (acc) => ' '.repeat(acc * 4 - 2);

const createObjLine = (node, depth = 1) => {
  if (!_.isObject(node)) {
    return `${node}`;
  }
  const result = Object.entries(node).map(([key, value]) => `${createIndent(depth + 1)}  ${key}: ${createObjLine(value, depth + 1)}`);
  return `{\n${result.join('\n')}\n${createIndent(depth)}  }`;
};

const createLine = (data, depth = 1) => {
  const result = data.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${createIndent(depth)}  ${node.key}: {\n${createLine(node.children, depth + 1)}\n${createIndent(depth)}  }`;
      case 'added':
        return `${createIndent(depth)}+ ${node.key}: ${createObjLine(node.value, depth)}`;
      case 'deleted':
        return `${createIndent(depth)}- ${node.key}: ${createObjLine(node.value, depth)}`;
      case 'changed':
        return `${createIndent(depth)}- ${node.key}: ${createObjLine(node.value, depth)}\n${createIndent(depth)}+ ${node.key}: ${createObjLine(node.value2, depth)}`;
      case 'unchanged':
        return `${createIndent(depth)}  ${node.key}: ${createObjLine(node.value, depth)}`;
      default:
        throw new Error(`Unsupported type ${node.type}`);
    }
  });
  return result.join('\n');
};

const stylish = (data) => `{\n${createLine(data)}\n}`;

export default stylish;
