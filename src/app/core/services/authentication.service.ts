import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AuthenticationService {
  token = {
    refresh_token: "refreshtokencode",
    exp: new Date(new Date().getDate() + 1),
    access_token: {
      username: "user",
      // roles: ['Admin', 'RegisteredUser', 'Super User']
    },
  };

  tokenKey = "a6smm_utoken";

  constructor(private router: Router, private httpClient: HttpClient) {}

  login(username, password) {
    this.setToken(this.token);
    window.location.pathname = "/";
  }

  logout(cb?) {
    this.removeToken();
  }

  getToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey));
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  getAccessToken() {
    return JSON.parse(localStorage.getItem(this.tokenKey))["access_token"];
  }

  isAuthenticated() {
    const isTokenAvailable = localStorage.getItem(this.tokenKey) ? true : false;
    return isTokenAvailable;
  }

  refreshToken() {
    this.token.exp = new Date(new Date().getDate() + 1);
    this.setToken(this.token);
  }

  removeToken() {
    localStorage.removeItem(this.tokenKey);
  }
}
