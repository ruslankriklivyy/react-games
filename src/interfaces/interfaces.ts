export interface IGameScreenshots {
  id: number;
  image: string;
}

export interface IPlatformsItem {
  id: number;
  name: string;
  slug: string;
}

export interface IPlatforms {
  platform: IPlatformsItem;
}

export interface IRequirements {
  minimum: string;
  recommended: string;
}

export interface IPlatformsReq {
  platform: IPlatformsItem;
  released_at: string;
  requirements: IRequirements;
}

export interface IGameDevelopers {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface IStore {
  domain: string;
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface IStoresItem {
  id: number;
  store: IStore;
}

export interface IStoresLinks {
  name: string;
  img: string;
  link: string;
}

export interface IPublishers {
  games_count: number;
  id: number;
  image_background: string;
  name: string;
  slug: string;
}

export interface IGameItem {
  added: number;
  background_image: string;
  website?: string;
  description_raw: string;
  stores: Array<IStoresItem>;
  developers: Array<IGameDevelopers>;
  clip: null;
  dominant_color: string;
  id: number;
  metacritic: number;
  name: string;
  description?: string;
  background_image_additional?: string;
  parent_platforms: Array<IPlatforms>;
  platforms: Array<IPlatformsReq>;
  playtime: number;
  publishers: Array<IPublishers>;
  rating: number;
  rating_top: number;
  ratings_count: number;
  released: string;
  reviews_count: number;
  reviews_text_count: number;
  saturated_color: string;
  short_screenshots: Array<IGameScreenshots>;
  slug: string;
  suggestions_count: number;
  tba: boolean;
  updated: string;
}

export interface IGames {
  count: number;
  description: string;
  filters: object;
  next: string;
  nofollow: boolean;
  nofollow_collections: Array<string>;
  noindex: boolean;
  previous: null;
  results: Array<IGameItem>;
  seo_description: string;
  seo_h1: string;
  seo_keywords: string;
  seo_title: string;
}

export interface IGenresResults {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface IGenres {
  count: number;
  next: string;
  previous: string;
  results: Array<IGenresResults>;
}

export interface IScreenshotsResults {
  id: number;
  image: string;
  height: number;
  width: number;
  is_deleted: false;
}
export interface IScreenshots {
  count: number;
  results: Array<IScreenshotsResults>;
}

export interface IUser {
  displayName: string;
  photoURL: string;
  uid: string;
}
