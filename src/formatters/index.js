import getPretty from './pretty.renderer';
import getPlain from './plain.renderer';
import getJson from './json.renderer';

const formats = {
  pretty: getPretty,
  plain: getPlain,
  json: getJson,
};

export default format => formats[format];
