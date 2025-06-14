import { Location } from 'history';

export const getQueryParams = (location: Location, param: string): string => {
  const query = location.search.substring(1);
  const vars = query.split('&');
  let returnVal = '';
  vars.forEach((key: string) => {
    const pair = key.split('=');
    if (decodeURIComponent(pair[0]) === param) {
      returnVal = decodeURIComponent(pair[1]);
    }
  });
  return returnVal;
};
