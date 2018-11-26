/* eslint-disable lodash/prefer-lodash-method */
export default arrDif => arrDif.map(e => JSON.stringify(e, null, '  ')).join('\n');
