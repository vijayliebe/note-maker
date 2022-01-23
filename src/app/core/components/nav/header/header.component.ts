import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displaySidebar = false;
  constructor() { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    window.location.pathname = "/";
  }

  toggleSideBar(){
    this.displaySidebar = !this.displaySidebar;
  }
}
