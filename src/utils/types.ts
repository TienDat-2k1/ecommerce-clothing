export type AccountModel = {
  id: string;
  active: boolean;
  name: string;
  email: string;
  role: string;
};

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

export type CategoryModel = {
  _id: string;
  name: string;
  imageCover: string;
};

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

export type ProductModel = {
  _id: string;
  name: string;
  imageCover: string;
  images?: string[];
  color?: string[];
  price: number;
  material: string;
  sizes: string[];
  ratingsAverage: number;
  ratingsQuantity: number;
  category: string;
  saleOff: number;
  description: string;
  sold: number;
};

export type ReviewModel = {
  id: string;
  rating: number;
  review: string;
  user: {
    id: string;
    name: string;
    photo: string;
  };
  createAt: string;
};

export type UserModel = {
  id: string;
  email: string;
  name: string;
  role: string;
  photo: string;
  address?: string;
  phone?: string;
};

export type SignUp = {
  email: string;
  password: string;
  name: string;
  passwordConfirm: string;
};

// enum: ['Receive order', 'Confirm', 'Shipped', 'Cancelled', 'Return'],
export enum StatusOrder {
  'Receive order' = 'Tiếp nhận đơn hàng',
  Confirm = 'Xác nhận đơn hàng',
  Shipping = 'Đang vận chuyển',
  Success = 'Giao hàng thành công',
  Cancelled = 'Hủy đơn hàng',
  Return = 'Đổi trả',
}
