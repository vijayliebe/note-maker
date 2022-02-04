import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'auth',
    canActivate: [AuthGuardService],
    component: LoginComponent
  },
  {
    path: 'home',
    canActivate: [],
    loadChildren: '../home/home.module#HomeModule'
  },
//   {
//     path: 'design-components',
//     canActivate: [AuthGuardService],
//     loadChildren: '../design-components/design-components.module#DesignComponentsModule'
//   },
//   {
//     path: 'overview',
//     canActivate: [AuthGuardService],
//     component: OverviewComponent
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
