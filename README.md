# MAIN CONFIG
These steps are only to start the project in an organized manner.
1. Create folders "pages", "components","interfaces", "services"
2. Import HttpClient in main.ts to use in future services:
```JavaScript
// main.ts

...

import { provideHttpClient } from '@angular/common/http';

...

bootstrapApplication(AppComponent, {
  providers: [
    
    ...
    
    provideHttpClient()

  ],
});

```
3. Create components "menu" and "header" to implement in app.component
4. Remove defined routes in "app/app.routes.ts" to build everything pointing to a component. 
    - This will allow the component to enter the "ionViewWillEnter" life cycle, important to update lists dynamically.

# COMPONENTS
* Components will be common structures for every page.

## app/app.component
* Container structure

## app/components/menu.component
* Menu pages
* Icons
* Router links

## app/components/header.component
* Side menu icon
* Page title

## app/components/products-by-section.component
* Organized list of products for a section:
  - Menu
  - Catering

## app/components/contact
* Contact form
* Social media list
* Locations map

## app/components/cms
All the CMS components, grouped by module

# LOGIN
Authentication using @ngx-pwa/local-storage
  
### Documentation:
* https://github.com/cyrilletuzi/angular-async-local-storage
* watch(): https://github.com/cyrilletuzi/angular-async-local-storage/blob/main/docs/WATCHING.md
* pipe(): https://rxjs.dev/guide/operators#piping
* switchmap(): https://rxjs.dev/api/index/function/switchMap

### Steps
1. Generate login page: `ionic g page pages/login`
2. Created form using `ReactiveFormsModule` and validators.
3. Installed `rxjs` and `@ngx-pwa/local-storage` packages to store token and validate login within the application:
```BASH
npm install rxjs
npm install @ngx-pwa/local-storage
```
4. Generated login service: `ionic g s services/login` to handle login and access functionality.
5. Generated service `AuthGuardService` to validate user's permissions on every route.
6. Created `auth-interceptor` to set authorization token on Http requests:
```Typescript
// auth-interceptor.ts

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

```
7. Created a subscription to watch for changes in the stored token and logout function:
```Typescript
// components/menu.component.ts

...

import { Subscription } from 'rxjs';

...

export class MenuComponent implements OnInit {
  public token:any;
  private tokenSubscription!: Subscription;

  constructor( 
    ...
    private storage: StorageMap
  ) {
    ...
  }

  setUserSubscription(){
    this.tokenSubscription = this.storage.watch('token').subscribe((token) => {
      this.token = token;
    });
  }

  ngOnInit(): void {
    this.setUserSubscription()
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }

  onLogOut(){
    this._usersService.logoutUser();
  }
  
  ...

}
```
9. Imported interceptor in main.ts
10. Updated routes definition to add a name and use it to validate required permissions.