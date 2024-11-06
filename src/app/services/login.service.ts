import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Observable, map, switchMap } from 'rxjs';
import { RouteRoles } from '../interfaces/route-roles';
import { LoggedUser } from '../interfaces/logged-user';



@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private routesRoles:RouteRoles = {
    cms_categories: [1],
    cms_orders_status: [1],
    cms_sections: [1],
    cms_users: [1],
    cms_products: [1],
    user_profile: [1,2,3],
    order_history: [1,2,3],
  }

  constructor( 
    private http: HttpClient,
    private router: Router,
    private storage: StorageMap
  ) { }

  // LOGIN
  loginUser(formData: any){
    return this.http.post<any>(`${environment.apiURL}users/login`, formData);
  }
  getLoggedUser(): Observable<LoggedUser | false> {
    return this.storage.get('user').pipe(
      map(_user => {
        if (_user) {
          const user:LoggedUser = _user as LoggedUser;
          const token = user.token;
          if(!token){ 
            this.logoutUser();
            return false; 
          }

          try {
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            const currentTime = Date.now() / 1000;
            if(payload.exp > currentTime){
              return user;
            }else{
              this.logoutUser();
              return false;
            }

          } catch (error) {
            this.logoutUser();
            return false;
          }
        } else {
          return false;
        }
      })
    );
  }
  getToken(){
    this.storage.get('user').subscribe({
      next: (user) => {
        return user;
      },
      error: (error) => {
        return false;
      }
    });
  }
  logoutUser(){
    this.storage.clear().subscribe(() => {});
    this.router.navigate(['/home']);
  }
  getRoleAccess(routeName:string): number[] | undefined{
    return this.routesRoles[routeName];
  }
  getAllRoleAccess(): RouteRoles{
    return this.routesRoles;
  }
  validateToken(token:string){
    if (!token) {
      return false; 
    }
  
    try {
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Date.now() / 1000;
  
      if (payload.exp < currentTime) {
        return false; // Token expired
      }
  
      return true; 
    } catch (error) {
      return false; // Token invalid
    }
  };
  

}