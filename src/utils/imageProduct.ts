const imageProduct = (id: string) => {
  return `${process.env.REACT_APP_BASE_URL_IMG}products/${id}`;
};

export default imageProduct;
