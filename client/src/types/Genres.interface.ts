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
