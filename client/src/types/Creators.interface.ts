export type CreatorItemType = {
  games: CreatorGameType[];
  games_count: number;
  id: number;
  image: string;
  image_background: string;
  name: string;
  positions: CreatorPositionType[];
  slug: string;
};



type CreatorGameType = {
  added: number;
  id: number;
  name: string;
  slug: string;
};
type CreatorPositionType = {
  id: number;
  name: string;
  slug: string;
};
