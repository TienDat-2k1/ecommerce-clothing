const imageCategory = (id: string) => {
  return `${process.env.REACT_APP_BASE_URL_IMG}categories/${id}`;
};

export default imageCategory;
