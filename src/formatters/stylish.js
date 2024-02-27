const createIndent = (acc) => '.'.repeat(acc * 4 - 2);

const createLine = (data, depth = 1) => {
  const result = data.map((node) => {
    switch (node.type) {
      case 'nested':
        return `${createIndent(depth)}  ${node.key}: {\n${createLine(node.children, depth + 1)}\n${createIndent(depth)}  }`;
      case 'added':
        return `${createIndent(depth)}+ ${node.key}: ${node.value}`;
      case 'deleted':
        return `${createIndent(depth)}- ${node.key}: ${node.value}`;
      case 'changed':
        return `${createIndent(depth)}- ${node.key}: ${node.value}\n${createIndent(depth)}+ ${node.key}: ${node.value2}`;
      default:
        return `${createIndent(depth)}  ${node.key}: ${node.value}`;
    }
  });

  return result.join('\n');
};

const stylish = (data) => `{\n${createLine(data)}\n}`;

export default stylish;
