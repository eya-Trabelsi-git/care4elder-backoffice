import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { CreateInvoiceComponent } from './invoice/create-invoice/create-invoice.component';
import { ListInvoicesComponent } from './list-invoices/list-invoices.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      // Ajouter la route 'create-invoice' dans les enfants du layout
      {
        path: 'create-invoice',
        loadComponent: () => import('./invoice/create-invoice/create-invoice.component').then(m => m.CreateInvoiceComponent),
        // Si nécessaire, protéger cette route avec un guard :
        // canActivate: [AuthGuard]
      },
      {
        path: 'list-invoice',
        loadComponent: () => import('./list-invoices/list-invoices.component').then(m => m.ListInvoicesComponent),
        // Si nécessaire, protéger cette route avec un guard :
        // canActivate: [AuthGuard]
      },
    ]
  },

  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'login' }
];
