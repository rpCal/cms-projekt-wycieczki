import { Person } from './../model/person';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '';

  constructor(private http: HttpClient) { }

  test(): Observable<any>{
    return this.http.get<Person[]>(this.baseUrl + '/users')
  }
  
}