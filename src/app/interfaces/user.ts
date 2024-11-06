import { UserType } from "./user-type";

export interface User {
    id?:number,
    name:string,
    lastName:string,
    address:string,
    email:string,
    UserType:UserType
}
