export const currencyFormat = (price: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(Math.round(price / 1000) * 1000);
};

export const salePrice = (originPrice: number, sale: number) => {
  const price = originPrice - (originPrice * sale) / 100;

  return currencyFormat(Math.round(price / 1000) * 1000);
};
