function arrayToCommaList(array) {

  if (array.length > 2) {
    array.splice(-1,0,'and');
    var listString = array.join(', ');
  }
  else {
    var listString = array.join(' and ');
  }

  return listString;
}

module.exports = arrayToCommaList;
