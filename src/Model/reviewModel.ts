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
