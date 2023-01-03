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
}
export interface newUserInfoInterface {
  newUserInfos: UserInterface;
}
