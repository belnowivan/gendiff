import getPretty from './prety.rander';
import getPlain from './plain.render';
import getJson from './json.render';

const formats = {
  pretty: getPretty,
  plain: getPlain,
  json: getJson,
};

export default format => formats[format];
