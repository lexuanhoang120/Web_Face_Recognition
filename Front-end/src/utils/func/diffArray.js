Array.prototype.DiffArray = function (a) {
  return this.filter(function (i) {
    return a.indexOf(i) < 0;
  });
};
