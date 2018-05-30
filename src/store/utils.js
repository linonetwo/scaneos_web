// for table
const rowHeight = 54;
const paginationHeight = 48;
export const getDisplayAreaHeight = () =>
  document.documentElement ? document.documentElement.clientHeight : window.innerHeight;
export const getPageSize = () => Math.floor((getDisplayAreaHeight() - paginationHeight) / rowHeight) - 1;
