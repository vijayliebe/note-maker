import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getSubjects(params?){
    const url =  '/subjects';
    return this.http.get<any>(url, {'params': params}).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }
  getCategories(params?){
    const url =  '/categories';
    return this.http.get<any>(url, {'params': params}).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }

  getNote(subject, params?){
    const url =  `/${subject}`;
    return this.http.get<any>(url, {'params': params}).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }

  createNote(payload){
    const url =  `/${payload.subject}`;
    return this.http.post<any>(url, payload).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }

  editNote(payload){
    const url =  `/${payload.subject}/${payload.id}`;
    return this.http.put<any>(url, payload).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }

  dltNote(subject, id){
    const url =  `/${subject}/${id}`;
    return this.http.delete<any>(url).pipe(
      map((res: Response) => {
        const body = res;
        return body || {};
      })
    );
  }
}
