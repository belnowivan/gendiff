/* eslint-disable lodash/prefer-lodash-method */
import path from 'path';
import fs from 'fs';
import arrDiff from './ast';
import toJsFormat from './parsers';

const actions = {
  plus: '+ ',
  dell: '- ',
  notChanged: '  ',
};

const strifyObj = (elem, depth = 2, prefix = ' ') => {
  const arrStr = Object.keys(elem).reduce((acc, key) => {
    if (elem[key] instanceof Object) {
      return [...acc, `${' '.repeat(depth)}${prefix}${key}: {`,
        `${strifyObj(elem[key], depth + 4)}\n${' '.repeat(depth + 2)}}`];
    }
    return [...acc, `${' '.repeat(depth)}${prefix}${key}: ${elem[key]}`];
  }, []);
  return arrStr.join('\n');
};

const prettyDif = (arr, depth = 4) => {
  const res = arr.reduce((acc, obj) => {
    if (obj.type === 'node') {
      return [...acc, `  ${' '.repeat(depth)}${obj.name} : {`, ...prettyDif(obj.child, depth + 2), `  ${' '.repeat(depth)}}`];
    }
    const prefix = actions[obj.action];
    const objContent = { [obj.name]: obj.value };
    return [...acc, strifyObj(objContent, depth, prefix)];
  }, []);
  return res;
};

export default (firstPath, secondPath) => {
  const readFirstFile = fs.readFileSync(firstPath, 'utf8');
  const readSecondFile = fs.readFileSync(secondPath, 'utf8');
  const dataFirstFile = toJsFormat(readFirstFile, path.extname(firstPath));
  const dataSecondtFile = toJsFormat(readSecondFile, path.extname(secondPath));
  const diff = arrDiff(dataFirstFile, dataSecondtFile);
  return prettyDif(diff);
};

const a = arrDiff({
  "common": {
    "setting1": "Value 1",
    "setting2": "200",
    "setting3": true,
    "setting6": {
      "key": "value"
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": "12345"
  }
},{
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": {
      "key": "value"
    },
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops"
    }
  },

  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },

  "group3": {
    "fee": "100500"
  }
});

console.log(prettyDif(a).join('\n'));
