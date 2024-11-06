import { Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'menu',
    loadComponent: () => import('./pages/menu/menu.page').then( m => m.MenuPage)
  },
  {
    path: 'catering',
    loadComponent: () => import('./pages/catering/catering.page').then( m => m.CateringPage)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.page').then( m => m.ContactPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'login/:returnPage',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'order-history',
    loadComponent: () => import('./pages/order-history/order-history.page').then( m => m.OrderHistoryPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'order_history' }
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cms/categories',
    loadComponent: () => import('./pages/cms/categories/categories.page').then( m => m.CategoriesPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_categories' }
  },
  {
    path: 'cms/orders-status',
    loadComponent: () => import('./pages/cms/orders-status/orders-status.page').then( m => m.OrdersStatusPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_orders_status' }
  },
  {
    path: 'cms/sections',
    loadComponent: () => import('./pages/cms/sections/sections.page').then( m => m.SectionsPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_sections' }
  },
  {
    path: 'cms/users',
    loadComponent: () => import('./pages/cms/users/users.page').then( m => m.UsersPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_users' }
  },
  {
    path: 'cms/products',
    loadComponent: () => import('./pages/cms/products/products.page').then( m => m.ProductsPage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'cms_products' }
  },
  {
    path: 'user-profile',
    loadComponent: () => import('./pages/user-profile/user-profile.page').then( m => m.UserProfilePage),
    canActivate: [AuthGuardService],
    data:{ routeName: 'user_profile' }
  },
  {
    path: 'order',
    loadComponent: () => import('./pages/order/order.page').then( m => m.OrderPage)
  },
  {
    path: 'new-user',
    loadComponent: () => import('./pages/new-user/new-user.page').then( m => m.NewUserPage)
  },
];
