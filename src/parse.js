import yaml from 'js-yaml';

const objFormatChoice = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': 'ago',
};
export default (dataFile, format) => {
  const funcFormat = objFormatChoice[format];
  return funcFormat(dataFile);
};
