function arrayToCommaList(array) {

  if (array.length > 2) {
    var lastVal = array.splice(-1,1,'and ');
    var listString = array.join(', ');
    listString = listString.concat(lastVal);
  }
  else {
    var listString = array.join(' and ');
  }

  return listString;
}

module.exports = arrayToCommaList;
