import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserType } from '../interfaces/user-type';
import { User} from '../interfaces/user';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../interfaces/user-info';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http: HttpClient ) { }

  getUsers(){
    return this.http.get<User[]>(`${environment.apiURL}users`);
  }
  getUser(id:number){
    return this.http.get<User>(`${environment.apiURL}users/${id}`);
  }
  updateUser(id:number, formData:FormData){
    return this.http.put<User>(`${environment.apiURL}users/${id}`,formData);
  }
  updateUserProfile(formData:any){
    return this.http.patch<User>(`${environment.apiURL}users`,formData);
  }
  newUser(formData: FormData){
    return this.http.post<User>(`${environment.apiURL}users`,formData);
  }
  deleteUser(id:number){
    return this.http.delete<User>(`${environment.apiURL}users/${id}`);
  }
  newCustomer(formData: UserInfo){
    return this.http.post<User>(`${environment.apiURL}users/customer`,formData);
  }

  // User Types
  getUserTypes(){
    return this.http.get<UserType[]>(`${environment.apiURL}userstypes`);
  }
  getUserType(id:number){
    return this.http.get<UserType>(`${environment.apiURL}userstypes/${id}`);
  } 
}