export type FavoriteItemType = {
  _id: string;
  added: number;
  added_by_status: addedByStatus;
  background_image: string;
  dominant_color: string;
  esrb_rating: basicType;
  genres: genreType[];
  id: number;
  metacritic: number;
  name: string;
  parent_platforms: parentPlatformsType[];
  platforms: platformsType[];
  playtime: number;
  rating: number;
  rating_top: number;
  ratings: ratingsType[];
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: shortScreenShotsType[];
  slug: string;
  stores: storesType[];
  suggestions_count: number;
  tags: tagsType[];
  tba: false;
  updated: string;
  userFrom: string;
};
type addedByStatus = {
  beaten: number;
  dropped: number;
  owned: number;
  playing: number;
  toplay: number;
  yet: number;
};

type basicType = {
  id: number;
  name: string;
  slug: string;
};

type genreType = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};

type parentPlatformsType = {
  platoform: basicType;
};

type platformsType = {
  platform: platformType;
  released_at: string;
  requirements_en: null | string;
  requirements_ru: null | string;
};

type platformType = {
  games_count: 1012;
  id: number;
  image: null | string;
  image_background: string;
  name: string;
  slug: string;
  year_end: null | number;
  year_start: null | number;
};

type ratingsType = {
  count: number;
  id: number;
  percent: number;
  title: string;
};
type shortScreenShotsType = {
  id: number;
  image: string;
};
type storesType = {
  id: number;
  store: storeType;
};

type storeType = {
  domain: string;
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};

type tagsType = {
  games_count: number;
  id: number;
  image_background: string;
  language: string;
  name: string;
  slug: string;
};
