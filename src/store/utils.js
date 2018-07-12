/* global window, document */
// @flow
import { format, distanceInWordsToNow } from 'date-fns';
import en from 'date-fns/locale/en';
import zh from 'date-fns/locale/zh_cn';

const locales = { en, zh };

/** 用于判断当前是否在 SSR */
export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);
export function getInitialStateFromServer() {
  // Do we have preloaded state available? Great, save it.
  const initialStateFromServer = !isServer ? window.__PRELOADED_STATE__ : {};
  // Delete it once we have it stored in a variable
  if (!isServer) {
    delete window.__PRELOADED_STATE__;
  }
  return initialStateFromServer;
}

export function scrollTop() {
  if (typeof window !== 'undefined') window.scrollTo(0, 0);
}

export function formatTimeStamp(
  timeStamp?: number | string | Date | null,
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
  return `${time ? `${format(now, 'YY-MM-DD HH:mm:ss')}` : ''}${
    distance
      ? ` ${distanceInWordsToNow(now, {
          locale: locales[locale],
          addSuffix: true,
          includeSeconds: true,
        }).replace('less than', '>')}`
      : ''
  }`;
}

// for table
const navHeight = 64;
const rowHeight = 46;
export const titleHeight = rowHeight;
const paginationHeight = 64;
export const getDisplayAreaHeight = () => {
  if (!isServer) {
    if (document.documentElement) {
      return document.documentElement.clientHeight;
    }
    return window.innerHeight;
  }
  return 700;
};
export const getTableHeight = () => (getDisplayAreaHeight() - navHeight - paginationHeight) * 3;
/** 根据屏幕高度和每行高度等信息，建议适合加载几条数据，最少 6 条，以便首页有数据 */
export const getPageSize = () => Math.max(Math.floor(getTableHeight() / rowHeight) - 1, 6);

export const reURLInformation = new RegExp(
  [
    '^(https?:)//', // protocol
    '(www.)?([^:/?#]*)', // hostname
    '(?::([0-9]+))?', // port
    '(/{0,1}[^?#]*)', // pathname
    '(\\?[^#]*|)', // search
    '(#.*|)$', // hash
  ].join(''),
);
