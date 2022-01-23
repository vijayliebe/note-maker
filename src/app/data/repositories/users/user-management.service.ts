import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private http: HttpClient) { }

  getUsers(params?) {
    const url =  '/getusers';
    return this.http.get<any>(url, {'params': params}).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }

  inviteUsers(companyId, userList, resendInvite?) {
    const url = '/inviteusers';
    const payload = {
      emails: userList,
      company_id: companyId,
      dashboard_version: '3.0'
    };

    if (resendInvite) {
      payload['resend_email'] = 1;
    }

    return this.http.post<any>(url, payload).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }
}
