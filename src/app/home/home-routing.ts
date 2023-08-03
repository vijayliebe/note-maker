import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: ':subject',
        component: DashboardComponent
    },
    {
        path: ':subject/:id',
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export const routing = RouterModule.forChild(routes);
