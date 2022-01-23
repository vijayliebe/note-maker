import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/nav/header/header.component';
import { FooterComponent } from './components/nav/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { AppLoaderComponent } from './app-loader/app-loader.component'
import { MaterialModule } from './material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor } from './services/httpconfig.interceptor';
import { CoreRoutingModule } from './core-routing.module';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { SidebarComponent } from './components/sidebar/sidebar.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    HttpClientModule,
    CoreRoutingModule
  ],
  declarations: [HeaderComponent, FooterComponent, LoginComponent, AppLoaderComponent, SidebarComponent],
  exports: [RouterModule, HeaderComponent, FooterComponent, LoginComponent, AppLoaderComponent, SidebarComponent],
  entryComponents: [],
  providers: [
    AuthenticationService,
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ]
})
export class CoreModule { }
