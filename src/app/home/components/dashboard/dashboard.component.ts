import { Component, OnInit } from '@angular/core';
import { DatacontextService } from 'src/app/data/datacontext.service';
import { AllApps } from 'src/app/shared/constants/dashboard-apps'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  apps: any = AllApps.apps;;
  appNames: any;

  constructor(private datacontextService: DatacontextService) { }

  ngOnInit() {
    this.appNames = Object.keys(this.apps);
    // this.datacontextService.userManagement.getUsers()
    //   .subscribe((data: any) => {
    //     if (!data.is_error) {
    //     }
    //   });
  }

}
