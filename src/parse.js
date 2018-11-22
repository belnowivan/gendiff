import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

const objFormatChoice = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.ini': 'ago',
};
export default (filePath) => {
  const contentFile = fs.readFileSync(filePath, 'utf8');
  const funcFormat = objFormatChoice[path.extname(filePath)];
  return funcFormat(contentFile);
};
