import type { FakeAdInterface } from "./Ad.interface";

export interface FavoritesFetchResponseInterface {
  success: boolean;
  favorites: FakeAdInterface[];
}
