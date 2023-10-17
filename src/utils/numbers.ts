export const formatPrice = (val = '') => `$ ` + Number(val);

export const numberWithCommas = (x = '') =>
  x.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const nunberWithCommasFixed = (x: number) => numberWithCommas(x.toFixed(2));

export const formatPriceFixed = (val: number) => `$ ` + nunberWithCommasFixed(val);