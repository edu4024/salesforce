import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
         HttpClient,
         HttpHeaders,
         HttpParams
                            } from '@angular/common/http';
import { Contact } from './contact';
import 'rxjs/add/operator/map';


const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
};

@Injectable()
export class ContactService {
  api='/contacts';

constructor(private http: HttpClient) { }


  getContacts (): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.api);
  }

  getContact(id: string): Observable<Contact> {
    const url = `${this.api}/${id}`;
      return this.http.get<Contact>(url);
  }


}
