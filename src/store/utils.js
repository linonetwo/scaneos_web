import { format, distanceInWordsToNow } from 'date-fns';
import en from 'date-fns/locale/en';
import zh from 'date-fns/locale/zh_cn';

const locales = { en, zh };

export function formatTimeStamp(timeStamp, locale, { time = true, distance = true } = {}) {
  // polyfill ms
  const now = new Date(timeStamp * 1000);
  return `${time ? `${format(now, 'YYYY-MM-DD HH:mm:ss ZZ')} ` : ''}${
    distance
      ? distanceInWordsToNow(now, {
          locale: locales[locale],
          addSuffix: true,
        })
      : ''
  }`;
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
