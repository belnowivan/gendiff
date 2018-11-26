import yaml from 'js-yaml';
import ini from 'ini';

const objFormatChoice = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};
export default (data, format) => {
  const parse = objFormatChoice[format];
  return parse(data);
};
