const imageUser = (id: string) => {
  return `${process.env.REACT_APP_BASE_URL_IMG}users/${id}`;
};

export default imageUser;
