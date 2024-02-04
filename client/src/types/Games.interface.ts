export interface gamesInterface {
  count: number;
  description: string;
  filters: filtersType;
  next: null | string;
  nofollow: boolean;
  nofollow_collections: string[];
  noindex: boolean;
  previous: null | string;
  results: resultsType[];
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
}
type filtersType = {
  years: yearsType[];
};

type resultsType = {
  added: number;
  added_by_status: addedByStatusType;
  background_image: string;
  clip: any;
  dominant_color: string;
  esrb_rating: Object;
  genres: developersType[];
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
  short_screenshots: [{ id: number; image: string }];
  slug: string;
  stores: storeType[];
  suggestions_count: number;
  tags: tagsType[];
  tba: boolean;
  updated: string;
  user_game: any;
};
type addedByStatusType = {
  beaten: number;
  dropped: number;
  owned: number;
  playing: number;
  toplay: number;
  yet: number;
};

export type yearsType = {
  count: number;
  decade: number;
  filter: string;
  from: number;
  nofollow: boolean;
  to: number;
};

export interface gameInterface {
  background_image: string;
  name: string;
  rating: number;
  ratings_count: number;
  released: string;
  updated: string;
  id: number;
}

export interface gameDetailsType {
  id: number;
  slug: string;
  name: string;
  name_original: string;
  description: string;
  metacritic: number;
  metacritic_platforms: metaCriticPlatformsType[];
  released: string;
  tba: false;
  updated: string;
  background_image: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: ratingsType[];
  reactions: reactionsType;
  added: number;
  added_by_status: addedByStatus;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: number;
  youtube_count: number;
  reviews_text_count: number;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: any[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  user_game: any;
  reviews_count: number;
  saturated_color: string;
  dominant_color: string;
  parent_platforms: parentPlatformsType[];
  platforms: platformsType[];
  stores: storesType[];
  developers: developersType[];
  genres: genresType[];
  tags: tagsType[];
  publishers: publishersType[];
  esrb_rating: esrbRatingType;
  clip: any;
  description_raw: string;
}
type metaCriticPlatformsType = {
  metascore: number;
  platform: { name: string; platform: number; slug: string };
  url: string;
};
type ratingsType = {
  count: number;
  id: number;
  percent: number;
  title: string;
};
type reactionsType = {
  [key: number]: number;
};
type addedByStatus = {
  beaten: number;
  dropped: number;
  owned: number;
  playing: number;
  toplay: number;
  yet: number;
};

type parentPlatformsType = {
  id: number;
  name: string;
  slug: string;
};

type platformsType = {
  platform: platformType;
  released_at: string;
  requirements: any;
  requirements_en?: null | string;
  requirements_ru?: null | string;
};

type tagsType = {
  games_count: 217412;
  id: 31;
  image_background: "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg";
  language: "eng";
  name: "Singleplayer";
  slug: "singleplayer";
};

type platformType = {
  games_count: number;
  id: number;
  image: null | string;
  image_background: string;
  name: string;
  slug: string;
  year_end: null | number;
  year_start: null | number;
};
type storeType = {
  domain: string;
  games_count: 7894;
  id: 3;
  image_background: string;
  name: string;
  slug: string;
};
type storesType = {
  id: number;
  store: { domain: string; games_count: number; id: number; image_background: string; name: string; slug: string };
  url: string;
};

type developersType = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};

type genresType = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};

type publishersType = {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
};
type esrbRatingType = {
  id: number;
  name: string;
  slug: string;
};
