export interface FiltersInterface {
  search?: string;
  priceRange: [number, number];
  category: Category;
}

export interface FilterUpdate {
  search?: string;
  priceRange: [number, number];
  category: Category;
}
export type Category =
  | "all"
  | "smartphones"
  | "fragrances"
  | "skincare"
  | "tops"
  | "furniture"
  | "home-decoration"
  | "groceries"
  | "womens-dresses"
  | "womens-shoes"
  | "mens-shirts"
  | "mens-shoes"
  | "mens-watches"
  | "womens-watches"
  | "womens-bags"
  | "womens-jewellery"
  | "sunglasses"
  | "automotive"
  | "motorcycle"
  | "lighting";
