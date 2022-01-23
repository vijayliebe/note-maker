import { Component } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'notes-maker';
  public isAuthenticated: any = false;
  
  constructor(private authentication: AuthenticationService) {
    this.isAuthenticated = this.authentication.isAuthenticated();
  }
}
