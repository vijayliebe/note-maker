import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class NotesService {
  mainUrl: any =  '/assets/db/db.json';
  _data: any;
  constructor(private http: HttpClient) {}

  fetchDbData(): any{
    if(window.location.href.includes("4400")){ // If local, don't fetch Db
      return of({});
    } else {
      return this.http.get<any>(this.mainUrl, {'params': {}}).pipe(
        map((res: Response) => {
          const body = res;
          console.log("mainUrl :: body ::", body);
          this._data = body;
        })
      );
    }
  }

  getSubjects(params?){
    console.log("***getSubjects");
    if(this._data){
      return of(this._data.subjects);
    } else {
      const url =  '/subjects';
      return this.http.get<any>(url, {'params': params}).pipe(
        map((res: Response) => {
          const body = res;
          return body || {};
        })
      );
    }
  }

  getCategories(params?){
    console.log("***getCategories");
    if(this._data){
      return of(this._data.categories);
    } else {
      const url =  '/categories';
      return this.http.get<any>(url, {'params': params}).pipe(
        map((res: Response) => {
          const body = res;
          return body || {};
        })
      );
    }
    
  }

  getNote(subject, params?){
    console.log("***getNote");
    const getNewData = (__data) => {
      let dataCopy = JSON.parse(JSON.stringify(__data));
      delete dataCopy.users;
      delete dataCopy.subjects;
      delete dataCopy.categories;
      delete dataCopy.algo;

      let allNotes = [];
      for(let sub in dataCopy){
        let notes = dataCopy[sub];
        allNotes = [...allNotes, ...notes];
      }
      return allNotes;
    };

    if(this._data){
      if(subject == "all"){
        let newData = getNewData(this._data);
        return of(newData);
      } else {
        return of(this._data[subject]);
      }
    } else {
      const url =  `/${subject == 'all'? 'db' : subject}`;
      return this.http.get<any>(url, {'params': params}).pipe(
        map((res: Response) => {
          if(subject == "all"){
            const body = res;
            let newData = getNewData(body || {});
            return newData;
          } else {
            const body = res;
            return body || {};
          }
        })
      );
    }

    
  }

  createCategory(payload){
    const url =  `/categories`
    return this.http.post<any>(url, payload).pipe(
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
