import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http';

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