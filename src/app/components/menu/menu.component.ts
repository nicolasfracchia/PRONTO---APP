import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenuToggle } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { alarm, cart, home, analytics, menu, receipt, send, apps, documents, people, pizza, personCircle, create, fastFood } from 'ionicons/icons';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';
import { RouteRoles } from 'src/app/interfaces/route-roles';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    IonList,
    IonListHeader,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel
  ]
})
export class MenuComponent implements OnInit {
  private userSubscription!: Subscription;
  private routeRoles:RouteRoles = this._loginService.getAllRoleAccess();
  public user:any;
  public appPagesUser = [
    { title: 'Login', url: '/login', icon: 'person-circle' },
  ];
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'In-store Menu', url: '/menu', icon: 'menu' },
    { title: 'Catering Menu', url: '/catering', icon: 'receipt' },
    { title: 'Contact', url: '/contact', icon: 'send' },
    { title: 'ORDER HERE', url: '/order', icon: 'cart' },
  ];
  public appPagesCms = [
    { title: 'Users', url: '/cms/users', icon: 'people', roles: this.routeRoles['cms_users'] },
    { title: 'Sections', url: '/cms/sections', icon: 'documents', roles: this.routeRoles['cms_sections'] },
    { title: 'Categories', url: '/cms/categories', icon: 'apps', roles: this.routeRoles['cms_categories'] },
    { title: 'Orders status', url: '/cms/orders-status', icon: 'alarm', roles: this.routeRoles['cms_orders_status'] },
    { title: 'Products', url: '/cms/products', icon: 'pizza', roles: this.routeRoles['cms_products'] },
  ];
  public AppPagesCmsByUserRole: any[] = [];
  
  constructor( 
    private _loginService: LoginService,
    private storage: StorageMap
  ) {
    addIcons({ home, menu, receipt, send, cart, apps, analytics, documents, people, pizza, personCircle, create, alarm, fastFood });
  }

  setUserSubscription(){
    this.userSubscription = this.storage.watch('user').subscribe((user) => {
      this.user = user;
      this.filterCmsPagesByRole();
    });
  }

  ngOnInit(): void {
    this.setUserSubscription()
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onLogOut(){
    this._loginService.logoutUser();
  }

  getUser(){
    this._loginService.getLoggedUser().subscribe(user => {
      this.user = user;
      console.log('USER: ',user);
      this.filterCmsPagesByRole();
    })
  }

  filterCmsPagesByRole(){
    if(this.user?.role){
      this.AppPagesCmsByUserRole = this.appPagesCms.filter(p => p.roles.includes(this.user.role));
    }else{
      this.AppPagesCmsByUserRole = [];
    }
  }

}
