import { Rating } from './../model/rating';
import { Reservation } from './../model/reservation';
import { User } from './../model/user';
import { Trip } from './../model/trip';
import { Parameters } from './parameters';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = window.location.host == "localhost:4200" ? 'http://localhost:5000' : 'https://pjatk-travel-agency.herokuapp.com';
  constructor(private http: HttpClient) { 
    
  }

/** - Pobieranie listy wycieczek wraz z filtrowaniem, sortowaniem, paginacja 
 * (plus filtrowanie po id, Name, City, Date, Price, AvaiableNumberOfPlaces)
 * URL: GET /public/Trip?limit=3&skip=0&sort_by_field=Price&sort_by_order=-1&where_Date=2019-12-20
 * 
*/
getTrips(parameters?: Parameters) {

  let params = new HttpParams();

  if (parameters) {
    params = (parameters.limit) ? params : params.append('', parameters.limit);
    params = (parameters.sort_by_field) ? params : params.append('', parameters.sort_by_field);
    params = (parameters.sort_by_order) ? params : params.append('', parameters.sort_by_order);
    params = (parameters.skip) ? params : params.append('', parameters.skip);
    params = (parameters.where_id) ? params : params.append('', parameters.where_id);
    params = (parameters.where_Name) ? params : params.append('', parameters.where_Name);
    params = (parameters.where_City) ? params : params.append('', parameters.where_City);
    params = (parameters.where_Date) ? params : params.append('', parameters.where_Date);
    params = (parameters.where_Price) ? params : params.append('', parameters.where_Price);
    params = (parameters.where_Promote) ? params : params.append('', parameters.where_Promote);
    params = (parameters.where_AvaiableNumberOfPlaces) ? params : params.append('', parameters.where_AvaiableNumberOfPlaces);
    return this.http.get<any>(this.baseUrl + '/public/Trip', { params: params })
  } else {
    return this.http.get<any>(this.baseUrl + '/public/Trip');
  }  

}

/** 
* - LOGOWANIE:
* URL POST /auth/login
* PAYLOAD: {Email, Password} 
* MOZESZ SPROBOWAC NA AKTUALNEGO ADMINA
* 
{
 "Email": "test20190130@gmail.com",
 "Password": "1234567890"
}
*/
login(email, password){
  return this.http.post<any>(this.baseUrl + 'auth/login', { Email:email, Password:password });
}

/**
 * - REJESTRACJA
 * URL POST /auth/register
 * PAYLOAD { Email, Password, FirstName, LastName}
 * RETURN User
 */
  register(user: User){
    return this.http.post<any>(this.baseUrl + '/auth/register' , { Email: user.Email, Password: user.Password, FirstName: user.FirstName, LastName: user.LastName });
  }

 /**
 * - POBIERZ AKTUALNEGO USERA
 * URL GET /auth/profile
 * PAYLOAD trzeba przekazac JWT token z logowania jako header {Authorization: "JWT...."}
 * 
*/
  getUser(){
    return this.http.get<User>(this.baseUrl + "/auth/profile"); 
  }

/**
 * - CRUD DLA WYCIECZKI (tylko dla admina)
 * URL /api/v1/Trip (GET, POST, PATCH, DELETE)
 * PAYlOAD te pola, ktore sa opisane w mongoose model. TRZEBA PAMIETAC O WSZYSTKICH POLACH!
 * 
 * URL /api/v1/USER 
 *
*/
  getTripAdmin(){
    return this.http.get<Trip>(this.baseUrl + 'api/v1/Trip');
  }

  postTripAdmin(trip: Trip){
    return this.http.post<Trip>(this.baseUrl + 'api/v1/Trip', { trip });
  }

  delTripAdmin(trip: Trip){
    return this.http.delete<Trip>(this.baseUrl + 'api/v1/Trip');
  }

/** 
 * URL /api/v1/USER 
*/
  getUserAdmin(){
    return this.http.get<User>(this.baseUrl + 'api/v1/User');
  }

  postUserAdmin(user: User){
    return this.http.post<Trip>(this.baseUrl + 'api/v1/User', { user });
  }

  delUserAdmin(userId: number){
    return this.http.delete<User>(this.baseUrl + 'api/v1/User', {
      params: new HttpParams().set('TripId', userId+"" )
    })
  }
  

/**
  - Stworz zamowienie jako zalogowany
 * URL POST /auth/Reservation
 * PAYLOAD {TripId, NumberOfPlaces}
 * 
*/
  postReservation(reservation: Reservation){
    return this.http.post<Reservation>(this.baseUrl + 'auth/Reservation', { TripId: reservation.trip._id, NumberOfPlcaes: reservation.numberOfPlaces });
  }

/*
 * - Anuluj zamowienie 
 * URL POST /auth/Reservation/cancel
 * PAYLOAD {RezerwationId}
*/
  deleteReservation(reservationId: number){
    return this.http.post<Reservation>(this.baseUrl + 'auth/Reservation/cancel', { RezerwationId: reservationId });
  }

/*
  * - Oplac zamowienie
  * URL POST /auth/Reservation/pay
  * PAYLOAD {RezerwationId}
  *
*/
  postPayReservation(reservationId: number){
    return this.http.post<Reservation>(this.baseUrl + 'auth/Reservation/pay', { RezerwationId: reservationId });
  }

/*
  * - Pobierz oceny dla trip
  * URL GET /auth/Rating?TripId
  * EXAMPLE: URL GET /public/Rating?TripId=5c526d35217a680eaa9aed02
  * 
*/
  getRating(tripId: number){
    return this.http.get<Rating>(this.baseUrl + '/auth/Rating', {
      params: new HttpParams().set('TripId', tripId+"" )
    })
  }

/**
  * - Napisz ocene
  * URL POST /auth/Rating
  * PAYLOAD {Comment, RateMark, TripId}
  * 
 */
  postRating(rating: Rating){
    return this.http.post<Rating>(this.baseUrl + '/auth/Rating', {Comment: rating.comment, RateMark: rating.rateMark, TripId: rating.trip._id});
  }


 /**   
  * 
  * - usun ocene
  * URL Delete /auth/Rating
  * PAYLOAD {RatingId}
  * 
  */
 //!!! czy tu nie powinien być post, używasz w deleteRating req.body a w delete nie mamy body (z tego co kojarze), więc może jak trip post i dodać do url /cancel
  deleteRating(ratingId: number){
    return this.http.delete<Rating>(this.baseUrl + '/auth/Rating');
  }

}






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
 * MOZESZ SPROBOWAC NA AKTUALNEGO ADMINA
 *  
{
	"Email": "test20190130@gmail.com",
	"Password": "1234567890"
}
 * 
 * 
 * - REJESTRACJA
 * URL POST /auth/register
 * PAYLOAD { Email, Password, FirstName, LastName}
 * 
 * 
 * - POBIERZ AKTUALNEGO USERA
 * URL GET /auth/profile
 * PAYLOAD trzeba przekazac JWT token z logowania jako header {Authorization: "JWT...."}
 * 
 * 
 * - CRUD DLA WYCIECZKI (tylko dla admina)
 * URL /api/v1/Trip (GET, POST, PATCH, DELETE)
 * PAYlOAD te pola, ktore sa opisane w mongoose model. TRZEBA PAMIETAC O WSZYSTKICH POLACH!
 * 
 * URL /api/v1/USER 
 *
 * 
 * 
 * - Stworz zamowienie jako zalogowany
 * URL POST /auth/Reservation
 * PAYLOAD {TripId, NumberOfPlaces}
 * 
 * 
 * - Anuluj zamowienie 
 * URL POST /auth/Reservation/cancel
 * PAYLOAD {RezerwationId}
 * 
 * 
 * - Oplac zamowienie
 * URL POST /auth/Reservation/pay
 * PAYLOAD {RezerwationId}
 * 
 * 
 * - Pobierz oceny dla trip
 * URL GET /auth/Rating?TripId
 * EXAMPLE: URL GET /public/Rating?TripId=5c526d35217a680eaa9aed02
 * 
 * 
 * - Napisz ocene
 * URL POST /auth/Rating
 * PAYLOAD {Comment, RateMark, TripId}
 * 
 * 
 * - usun ocene
 * URL Delete /auth/Rating
 * PAYLOAD {RatingId}
 * 
 * 
 *
*/
  