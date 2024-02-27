import _ from 'lodash';

const createDiff = (data1, data2) => {
  const keys = _.sortBy(_.union(_.keys(data1), _.keys(data2)));
  return keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) {
      return { key, children: createDiff(data1[key], data2[key]), type: 'nested' };
    }
    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: 'added' };
    }
    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: 'deleted' };
    }
    if (data1[key] !== data2[key]) {
      return {
        key, value: data1[key], value2: data2[key], type: 'changed',
      };
    }
    return { key, value: data1[key], type: 'unchanged' };
  });
};

export default createDiff;
