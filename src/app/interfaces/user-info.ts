import { User } from "./user";
export interface UserInfo extends Omit<User, 'UserType'>{}