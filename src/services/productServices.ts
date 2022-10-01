import * as httpRequest from '../utils/httpRequest';

export const getAllProduct = async (option = {}) => {
  try {
    const res = await httpRequest.get('products', {
      params: { ...option },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const res = await httpRequest.get(`products/${id}`, {
      params: {},
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
