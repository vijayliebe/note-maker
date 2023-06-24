import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full'
    },
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

export const routing = RouterModule.forChild(routes);
