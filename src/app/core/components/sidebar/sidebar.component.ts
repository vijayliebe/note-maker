import { Component, OnInit } from '@angular/core';
import { AllApps } from 'src/app/shared/constants/dashboard-apps'
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  apps: any = AllApps.apps;
  appNames: any;
  constructor() { }

  ngOnInit() {
    this.appNames = Object.keys(this.apps);
    console.log('**', this.appNames);
  }

}
