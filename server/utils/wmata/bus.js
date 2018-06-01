import { titleCase } from '../general/index';

/**
 * Converts the route names from being all upper case to title case and fixes spacing.
 *
 * @param      {String}                      routeName  The route name.
 * @return     {String}  The fixed route name string.
 */
export function fixRouteNames(routeName) {
  const nameArr = routeName.split(/[\s]+/);
  const dashAfterRegEx = new RegExp(/([\w]+-\s)+/);
  const dashBeforeRegEx = new RegExp(/(\s-[\w]+)+/);
  let name = null;

  for (let i = 0; i < nameArr.length; i+=1) {
    if (i > 0) {
      if (nameArr[i].indexOf('+') >= 1) {
        let wordArr = nameArr[i].split('+');

        for (let j = 0; j < wordArr.length; j+=1) {
          wordArr[j] = titleCase(wordArr[j]);
        }

        nameArr[i] = wordArr.join('+');

      } else if (nameArr[i].indexOf('-') >= 1) {
        let wordArr = nameArr[i].split('-');

        for (let j = 0; j < wordArr.length; j+=1) {
          wordArr[j] = titleCase(wordArr[j]);
        }

        nameArr[i] = wordArr.join('-');
      } else if (dashAfterRegEx.test(nameArr[i])) {
        const index = nameArr[i].indexOf('-');
        let str = nameArr[i].substring(0, index);

        str = titleCase(str);

        nameArr[i] = str + ' - ';
      } else if (dashBeforeRegEx.test(nameArr[i])) {
        const index = nameArr[i].indexOf('-');
        let str = nameArr[i].substring(1);

        str = titleCase(str);

        nameArr[i] = ' - ' + str;
      } else {
        nameArr[i] = titleCase(nameArr[i]);
      }
    }
  }

  name = nameArr.join(' ');

  return name;
}
