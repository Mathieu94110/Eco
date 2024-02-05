export type StoreDetailsType = {
  description: string;
  domain: string;
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};
export type StoreType = {
  count: 10;
  next: null;
  previous: null;
  results: storeResultsType[];
};
type storeResultsType = {
  domain: string;
  games: storeGamesType[];
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};
type storeGamesType = {
  added: number;
  id: number;
  name: string;
  slug: string;
};
