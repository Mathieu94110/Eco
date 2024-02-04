export interface FakeAdInterface {
  _id?: string;
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: [string];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}
export interface UserAdInterface {
  userFrom?: string;
  _id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  image: any;
  created_at?: string;
  _v?: number;
}

export interface PageOptionsInterface {
  page: number;
  perPage: number;
}
