import * as httpRequest from '../utils/httpRequest';

export const getAllProduct = async (option = {}) => {
  try {
    const res = await httpRequest.get('products', {
      params: { ...option },
    });

    return res;
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

export const getProductAlias = async (aliasPath: string, options = {}) => {
  try {
    const res = await httpRequest.get(`/products/${aliasPath}`, {
      params: { ...options },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllReviewProduct = async (id: string) => {
  try {
    const res = await httpRequest.get(`/products/${id}/reviews`, {
      params: {
        fields: 'createdAt, id, rating, review, user',
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
