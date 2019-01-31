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


/**
 * DOSTEPNE API
 * 
 * - Pobieranie listy wycieczek wraz z filtrowaniem, sortowaniem, paginacja 
 * (plus filtrowanie po id, Name, City, Date, Price, AvaiableNumberOfPlaces)
 * URL: GET /public/Trip?limit=3&skip=0&sort_by_field=Price&sort_by_order=-1&where_Date=2019-12-20
 * 
 * 
 * - LOGOWANIE:
 * URL POST /auth/login
 * PAYLOAD: {Email, Password} 
 * 
 * 
 * - REJESTRACJA
 * URL POST /auth/register
 * PAYLOAD { Email, Password, FirstName, LastName}
 * 
 * 
 * - POBIERZ AKTUALNEGO USERA
 * URL GET /auth/profile
 * PAYLOAD trzeba przekazac JWT token z logowania
*/
  

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