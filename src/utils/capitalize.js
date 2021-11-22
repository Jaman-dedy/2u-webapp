export default str => {
  if (typeof str === 'string' && str.length) {
    return `${str[0].toUpperCase()}${str.substr(1)}`;
  }
  return str;
};
