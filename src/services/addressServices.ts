import axios from 'axios';
import { Division } from '../utils/types';

export const getAllDivisions = async (): Promise<Division> => {
  const res = await Promise.all([
    axios.get('https://provinces.open-api.vn/api/p'),
    axios.get('https://provinces.open-api.vn/api/d'),
    axios.get('https://provinces.open-api.vn/api/w'),
  ]);

  const data = res.map(result => result.data);

  return {
    provinces: data[0],
    districts: data[1],
    wards: data[2],
  };
};
