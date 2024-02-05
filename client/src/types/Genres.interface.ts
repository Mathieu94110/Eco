export type genresInterface = {
  count: number;
  next: null | string;
  previous: null | string;
  results: genresResultsType[];
};
type genresResultsType = {
  games: genresResultsTypeGamesType[];
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};
type genresResultsTypeGamesType = {
  added: number;
  id: number;
  name: string;
  slug: string;
};
export type genresListType = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
  games: genreGamesType;
};

type genreGamesType = {
  added: number;
  id: number;
  name: string;
  slug: string;
};
