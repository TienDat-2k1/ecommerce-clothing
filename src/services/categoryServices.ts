import * as httpRequest from '../utils/httpRequest';

export const getAllCategories = async (options = {}) => {
  try {
    const res = await httpRequest.get('categories', {
      params: { ...options },
    });

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategory = async (id: string) => {
  try {
    const res = await httpRequest.get(`categories/${id}`);

    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
