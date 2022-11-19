export interface FakeAddInterface {
  _id?: string;
  author?: string;
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
export interface UserAddInterface {
  _id?: string;
  author?: string;
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  image?: string | ArrayBuffer | null;
  created_at?: Date;
}
export interface PageOptionsInterface {
  page: number;
  perPage: any;
}
