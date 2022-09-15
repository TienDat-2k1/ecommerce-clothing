export type CartModel = {
  _id: string;
  name: string;
  imageCover: string;
  size: string;
  sizes: string[];
  color?: string;
  quantity: number;
  price: number;
};
