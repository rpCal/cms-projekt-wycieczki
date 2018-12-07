import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = '';

  constructor(private http: HttpClient) { }

  test(): Observable<any>{
    return this.http.get<any>(this.apiBaseUrl + 'https://jsonplaceholder.typicode.com/todos/1')
  }
  
}