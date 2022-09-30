export type ProductModel = {
  _id: string;
  name: string;
  imageCover: string;
  images?: string[];
  color?: string[];
  price: number;
  material: string[];
  sizes: string[];
  rating: number;
  numberReview: number;
  collectionId: string;
  saleOff: number;
  description: string;
};
