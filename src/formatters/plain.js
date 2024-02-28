import _ from 'lodash';

const getFormatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const createPlain = (data, path = '') => {
  const result = data.map((node) => {
    const pathName = (path === '' ? `${node.key}` : `${path}.${node.key}`);
    switch (node.type) {
      case 'nested':
        return createPlain(node.children, pathName);
      case 'added':
        return `Property '${pathName}' was added with value: ${getFormatValue(node.value)}`;
      case 'deleted':
        return `Property '${pathName}' was removed`;
      case 'changed':
        return `Property '${pathName}' was updated. From ${getFormatValue(node.value)} to ${getFormatValue(node.value2)}`;
      default:
        return null;
    }
  });
  return result.filter(Boolean).join('\n');
};

export default createPlain;
