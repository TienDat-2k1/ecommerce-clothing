import axios from 'axios';

console.log(process.env);

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export const get = async (path: string, options = {}) => {
  const res = await httpRequest.get(path, options);

  return res.data;
};
