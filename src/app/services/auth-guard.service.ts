import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { LoginService } from './login.service';
import { Location } from '@angular/common';
import { GeneralService } from './general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(
    private router: Router,
    private location: Location,
    private _loginService: LoginService,
    private _generalService: GeneralService
  ) { }

  canActivate(route: ActivatedRouteSnapshot){
    this._loginService.getLoggedUser().subscribe((user) => {
      if(!user){
        this.router.navigate(['/login']);
        return false;
      }else{
        const routeName = route.data['routeName'];
        const requiredRoles = this._loginService.getRoleAccess(routeName);
        if(requiredRoles && requiredRoles.includes(user.role)){
          return true;
        }else{
          this._generalService.presentToast('Access denied.', 'danger');
          this.location.back();
          return false;
        }
      }
    });
  }
}
