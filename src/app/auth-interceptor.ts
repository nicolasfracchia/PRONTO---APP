import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LoginService } from "./services/login.service";

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const loginService = inject(LoginService);
  return loginService.getLoggedUser().pipe(
    switchMap(user => {
      if(!user || !user.token){
        return next(req);
      }else{
        const cloned = req.clone({
          setHeaders: {
            authorization: user.token,
          },
        });
        return next(cloned);
      }
    })
  );
};
