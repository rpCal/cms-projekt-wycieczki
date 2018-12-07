import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = '';

  constructor(private http: HttpClient) { }

  login(username, password){
    return this.http.post<any>(this.baseUrl + `/users/authenticate`, { username, password });
  }
}