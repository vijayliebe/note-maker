import { Injectable, Inject, NgZone } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class AuthGuardService {

    constructor(@Inject(DOCUMENT) private document: HTMLDocument,
                private authentication: AuthenticationService,
                private zone: NgZone,
                private router: Router) { }

    canActivate(): boolean | Promise<boolean> {
         const isAuthenticated = this.authentication.isAuthenticated();
         const isAuthPage = window.location.pathname.includes('auth');
         if (isAuthenticated) {
           if (isAuthPage) {
            this.router.navigate(['home']);
           } else {
            return true;
           }
         }  else {
           if (isAuthPage) {
            return true;
           } else {
            this.redirectToLoginPage(); return false;
           }
         }
    }

    redirectToLoginPage() {
      window.location.pathname = '/auth';
    }

}
