// for table
const navHeight = 64;
const rowHeight = 46;
export const titleHeight = rowHeight;
const paginationHeight = 64;
export const getDisplayAreaHeight = () =>
  document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
export const getTableHeight = () => getDisplayAreaHeight() - navHeight - paginationHeight;
export const getPageSize = () => Math.floor(getTableHeight() / rowHeight) - 1;
