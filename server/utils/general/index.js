/**
 * Removes duplicate values from an array of objects.
 *
 * @param      {Array}  dupArr  The duplicate array.
 * @param      {String}  key     The property key to check to remove.
 * @return     {Array}   The array with duplicate values removed.
 */
export function removeDuplicates(dupArr, key) {
  let result = [];

  result = dupArr.filter((obj, pos, arr) => {
    return arr.map((mapObj) => mapObj[key]).indexOf(obj[key]) === pos;
  });

  return result;
}

/**
 * Converts a string of text to title case.
 *
 * @param      {String}  str     The string to convert.
 */
export function titleCase(str) {
  return str.replace(/\w\S*/g, (txt) => {
    if (txt === 'NE' || txt === 'NW' || txt === 'SE' || txt === 'SW') {
      return txt;
    }
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}
