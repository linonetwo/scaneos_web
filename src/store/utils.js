// @flow
import { format, distanceInWordsToNow } from 'date-fns';
import en from 'date-fns/locale/en';
import zh from 'date-fns/locale/zh_cn';

const locales = { en, zh };

export function formatTimeStamp(
  timeStamp?: number | string | null,
  locale: string,
  { time = true, distance = true }: { time?: boolean, distance?: boolean } = {},
) {
  // polyfill ms
  let now;
  if (typeof timeStamp === 'string') {
    now = timeStamp;
  } else if (typeof timeStamp === 'number') {
    now = new Date(timeStamp * 1000);
  } else {
    return '-';
  }
  return `${
    distance
      ? distanceInWordsToNow(now, {
          locale: locales[locale],
          addSuffix: true,
          includeSeconds: true,
        }).replace('less than', '>')
      : ''
  }${time ? ` (${format(now, 'YY-MM-DD HH:mm:ss')})` : ''}`;
}

// for table
const navHeight = 64;
const rowHeight = 46;
export const titleHeight = rowHeight;
const paginationHeight = 64;
export const getDisplayAreaHeight = () =>
  document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
export const getTableHeight = () => getDisplayAreaHeight() - navHeight - paginationHeight;
export const getPageSize = () => Math.floor(getTableHeight() / rowHeight) - 1;

export function locationBelongsToArea(location: string, area: string) {
  if (area === 'Asia') {
    if (location.indexOf('Asia') !== -1) return true;
    if (location.indexOf('China') !== -1) return true;
    if (location.indexOf('Hong Kong') !== -1) return true;
    if (location.indexOf('Beijing') !== -1) return true;
    if (location.indexOf('Shanghai') !== -1) return true;
    if (location.indexOf('Korea') !== -1) return true;
    if (location.indexOf('Singapore') !== -1) return true;
    if (location.indexOf('Japan') !== -1) return true;
    if (location.indexOf('Thailand') !== -1) return true;
    if (location.indexOf('India') !== -1) return true;
    if (location.indexOf('Bangkok') !== -1) return true;
  }
  if (area === 'America') {
    if (location.indexOf('America') !== -1) return true;
    if (location.indexOf('USA') !== -1) return true;
    if (location.indexOf('Argentina') !== -1) return true;
    if (location.indexOf('Canada') !== -1) return true;
    if (location.indexOf('Virgin') !== -1) return true;
    if (location.indexOf('BVI') !== -1) return true;
    if (location.indexOf('Wyoming') !== -1) return true;
    if (location.indexOf('California') !== -1) return true;
    if (location.indexOf('Detroit') !== -1) return true;
    if (location.indexOf('Dominican') !== -1) return true;
    if (location.indexOf('Seattle') !== -1) return true;
    if (location.indexOf('Anguilla') !== -1) return true;
    if (location.indexOf('Mexico') !== -1) return true;
    if (location.indexOf('Brazil') !== -1) return true;
    if (location.indexOf('Puerto') !== -1) return true;
  }
  if (area === 'Europe') {
    if (location.indexOf('Europe') !== -1) return true;
    if (location.indexOf('England') !== -1) return true;
    if (location.indexOf('Netherlands') !== -1) return true;
    if (location.indexOf('Poland') !== -1) return true;
    if (location.indexOf('Amsterdam') !== -1) return true;
    if (location.indexOf('EU') !== -1) return true;
    if (location.indexOf('Ukraine') !== -1) return true;
    if (location.indexOf('Sweden') !== -1) return true;
    if (location.indexOf('Iceland') !== -1) return true;
    if (location.indexOf('Ireland') !== -1) return true;
    if (location.indexOf('Norway') !== -1) return true;
  }
  if (area === 'Oceania') {
    if (location.indexOf('Oceania') !== -1) return true;
    if (location.indexOf('Australia') !== -1) return true;
    if (location.indexOf('Zealand') !== -1) return true;
  }
  if (area === 'Africa') {
    if (location.indexOf('Africa') !== -1) return true;
    if (location.indexOf('Kenya') !== -1) return true;
  }
  return false;
}
