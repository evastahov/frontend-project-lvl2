import yaml from 'js-yaml';

const switchParser = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported format${format}`);
  }
};

export default switchParser;
