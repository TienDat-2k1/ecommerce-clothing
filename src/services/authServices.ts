import * as httpRequest from '../utils/httpRequest';

export type Login = {
  email: string;
  password: string;
};

export const login = async (data: Login) => {
  try {
    const res = await httpRequest.post('/user/login', data);

    return res;
  } catch (error) {
    console.log(error);
  }
};
