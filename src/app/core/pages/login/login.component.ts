import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonNotificationService } from '../../../shared/services/common-notification/common-notification.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authentication: AuthenticationService,
    public route: ActivatedRoute,
    private commonNotificationService: CommonNotificationService,
    private router: Router) { }

  hidePassword = true;
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  ngOnInit() {
  }

  onLoginSubmit() {
    if (!this.loginForm.invalid) {
      const username = this.loginForm.value.email,
          password = this.loginForm.value.password;
      this.authentication.login(username, password);
    }
  }

}
