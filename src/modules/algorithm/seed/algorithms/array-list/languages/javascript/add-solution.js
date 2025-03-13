const { ArrayList } = require('./exercise');

ArrayList.prototype.add = function (element) {
  this.data.push(element);
};
