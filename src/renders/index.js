import getPretty from './prety-tree.rander';
import getPlain from './plain.render';

const formats = {
  pretty: getPretty,
  plain: getPlain,
};

export default format => formats[format];
