export interface UserInterface {
  userName?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: any;
  phone?: number;
  address?: string;
  password?: string;
  zip?: number;
  _id: string;
}
export interface newUserInfoInterface {
  newUserInfos: UserInterface;
}

export interface userAdsConfigInterface {
  key: string;
  title: string;
}
[];
export interface userAdsPaginationInterface {
  page: number;
  perPage: number;
}
