import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/dashboard-layout/dashboard-layout.component').then(mod => mod.DashboardLayoutComponent),
        children: [
            {
                path: '',
                redirectTo: '/products',
                pathMatch: 'full'
            },
            {
                path: 'products',
                loadComponent: () => import('./pages/products/products.component').then(mod => mod.ProductsComponent),
            },
            {
                path: 'orders',
                loadComponent: () => import('./pages/orders/orders.component').then(mod => mod.OrdersComponent),
            },
        ]
    },
];
