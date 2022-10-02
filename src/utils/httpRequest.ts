import axios from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = process.env.REACT_APP_BASE_URL;

const httpRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const get = async (path: string, options = {}) => {
  try {
    const res = await httpRequest.get(path, options);

    return res.data;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
};

export const post = async (path: string, data: object) => {
  try {
    const res = await httpRequest.post(path, data);

    return res.data;
  } catch (error: any) {
    if (error?.response) {
      toast.error(error.response.data.message);
    }
  }
};
