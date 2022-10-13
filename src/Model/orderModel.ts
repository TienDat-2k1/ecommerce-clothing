type ProductOrder = {
  _id: string;
  imageCover: string;
  name: string;
};

type ProductItem = {
  price: number;
  quantity: number;
  size: string;
  product: ProductOrder;
};

type Customer = {
  id: string;
  name: string;
};

export type OrderModel = {
  _id: string;
  address: string;
  phone: string;
  createAt: string;
  status: string;
  customer: Customer;
  items: ProductItem[];
  totalPrice: number;
};
