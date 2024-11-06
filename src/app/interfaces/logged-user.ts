import { User } from "./user";
export interface LoggedUser extends Omit<User, 'UserType'>{
    role:number,
    token:string
}
