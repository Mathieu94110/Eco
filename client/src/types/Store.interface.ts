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
export type storeResultsType = {
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
type UserResponse = {
  success: boolean;
  user: User;
}
export type User = {
  _id: string;
  email: string;
  password: string;
  pseudo: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
}
export type GameDetails = {
  id: number;
  name: string;
  name_original: string;
  slug: string;
  description: string;
  description_raw: string;
  background_image: string;
  background_image_additional: string;
  released: string;
  updated: string;
  website: string;
  metacritic: number;
  metacritic_url: string;
  metacritic_platforms: MetacriticPlatform[];
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reactions: Record<string, number>;
  playtime: number;
  tba: boolean;
  added: number;
  additions_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reviews_count: number;
  reviews_text_count: number;
  suggestions_count: number;
  screenshots_count: number;
  movies_count: number;
  twitch_count: number;
  youtube_count: number;
  reddit_count: number;
  reddit_url: string;
  reddit_description: string;
  reddit_name: string;
  reddit_logo: string;
  dominant_color: string;
  saturated_color: string;
  clip: null | string;
  developers: EntityRef[];
  publishers: EntityRef[];
  genres: EntityRef[];
  tags: EntityRef[];
  stores: StoreEntry[];
  platforms: PlatformEntry[];
  parent_platforms: ParentPlatformEntry[];
  game_series_count: number;
  parents_count: number;
  user_game: null | any;
  esrb_rating: EsrbRating;
  alternative_names: string[];
  added_by_status: AddedByStatus;
}

type EntityRef = {
  id: number;
  name: string;
  slug: string;
}

type MetacriticPlatform = {
  metascore: number;
  url: string;
  platform: {
    platform: number;
    name: string;
    slug: string;
  };
}

type Rating = {
  id: number;
  title: string;
  count: number;
  percent: number;
}

type StoreEntry = {
  id: number;
  url: string;
  store: {
    id: number;
    name: string;
    slug: string;
    domain: string;
  };
}

type PlatformEntry = {
  platform: {
    id: number;
    name: string;
    slug: string;
    image_background: string
  };
  released_at: string | null;
  requirements?: {
    minimum?: string;
    recommended?: string;
  };
}

type ParentPlatformEntry = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

type EsrbRating = {
  id: number;
  name: string;
  slug: string;
}

type AddedByStatus = {
  yet: number;
  owned: number;
  beaten: number;
  toplay: number;
  dropped: number;
  playing: number;
}
type AdDetails = {
  id: number,
  brand: string,
  category: string,
  description: string,
  discountPercentage: number,
  images: string | null,
  price: number,
  rating: number,
  stock: number,
  thumbnail: string,
  title: string,
}

type Genre = {
  id: number,
  name: string,
  slug: string,
}

type Tag = {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

type Platform = {
  id: number;
  name: string;
  slug: string;
}

export type Game = {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings_count: number;
  reviews_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status?: Record<string, number>;
  playtime: number;
  tba: boolean;
  suggestions_count: number;
  updated: string;
  metacritic?: number;
  dominant_color: string;
  saturated_color: string;
  user_game: null | any;
  clip: null | any;
  esrb_rating?: {
    id: number;
    name: string;
    slug: string;
  };
  genres: Genre[];
  tags: Tag[];
  platforms: {
    platform: Platform;
    released_at: string | null;
    requirements?: {
      minimum?: string;
      recommended?: string;
    };
  }[];
  parent_platforms: {
    platform: {
      id: number;
      name: string;
      slug: string;
    };
  }[];
  short_screenshots: {
    id: number;
    image: string;
  }[];
  stores: {
    id: number;
    store: {
      id: number;
      name: string;
      slug: string;
      domain: string;
    };
  }[];
}


export type Games = {
  count: number;
  description?: string;
  filters?: Record<string, any>;
  next: string | null;
  previous: string | null;
  nofollow: boolean;
  nofollow_collections: string[];
  noindex: boolean;
  results: Game[];
  seo_description?: string;
  seo_h1?: string;
  seo_keywords?: string;
  seo_title?: string;
}

export type Creator = {
  results: {
    id: number;
    name: string;
    image: string;
    image_background: string;
    games_count: number;
    positions?: {
      id: number;
      name: string;
      slug: string;
    }[];
    games?: {
      id: number;
      name: string;
      slug: string;
    }[];
  }
}

export type Genres = {
  count: number,
  next: number | null,
  previous: number | null,
  results: Omit<StoreDetailsType, 'description' | 'domain'>[]
}

export type State = {
  status: '' | 'loading';
  user: UserResponse | null;
  gameDetails: GameDetails;
  isUserLogged: boolean;
  currentPost: {
    userFrom: string;
    image: string;
    title: string;
    description: string;
    price: number | null;
    category: string;
  };
  currentFavorites: GameDetails[];
  favoriteDetails: GameDetails;
  adDetails: AdDetails;
  games: Games[];
  creators: Creator[];
  stores: any[];
  storeDetails: any[]; // les 2 any et build failed sur vercel
  genres: Genres[];
  searchedGames: Games[];
  windowWidth: number;
}