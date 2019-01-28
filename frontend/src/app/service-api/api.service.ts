import { Trip } from './../model/trip';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://pjatk-travel-agency.herokuapp.com/';
  constructor(private http: HttpClient) { }

  login(username, password){
    return this.http.post<any>(this.baseUrl + `users/authenticate`, { username, password });
  }

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.baseUrl + "");
  }

  getTrip(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.baseUrl + "trips/" + id);
  }
  
  addTrip(trip: Trip) {
    return this.http.post(this.baseUrl + "trips/add", trip, httpOptions);
  }

}