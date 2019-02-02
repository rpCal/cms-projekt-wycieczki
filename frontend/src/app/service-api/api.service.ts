import { Rating } from './../model/rating';
import { Reservation } from './../model/reservation';
import { User } from './../model/user';
import { Trip } from './../model/trip';
import { Parameters } from './parameters';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, } from '@angular/common/http';
import { DataService } from '../data.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl = window.location.host == "localhost:4200" ? 'http://localhost:5000' : 'https://pjatk-travel-agency.herokuapp.com';
  private baseUrl = 'https://pjatk-travel-agency.herokuapp.com';
  constructor(private http: HttpClient, private dataService: DataService) { 
    
  }

/** - Pobieranie listy wycieczek wraz z filtrowaniem, sortowaniem, paginacja 
 * (plus filtrowanie po id, Name, City, Date, Price, AvaiableNumberOfPlaces)
 * URL: GET /public/Trip?limit=3&skip=0&sort_by_field=Price&sort_by_order=-1&where_Date=2019-12-20
 * 
*/
getTrips(parameters?: Parameters) {

  if (parameters != undefined) {
    let params = new HttpParams();
    if(parameters.limit){ params = params.append('limit', parameters.limit); }
    if(parameters.sort_by_field){ params = params.append('sort_by_field', parameters.sort_by_field); }
    if(parameters.sort_by_order){ params = params.append('sort_by_order', parameters.sort_by_order); }
    if(parameters.skip){ params = params.append('skip', parameters.skip); }
    if(parameters.where_id){ params = params.append('where_id', parameters.where_id); }
    if(parameters.where_Name){ params = params.append('where_Name', parameters.where_Name); }
    if(parameters.where_City){ params = params.append('where_City', parameters.where_City); }
    if(parameters.where_DeparturePlace){ params = params.append('where_DeparturePlace', parameters.where_DeparturePlace); }
    if(parameters.where_Date){ params = params.append('where_Date', parameters.where_Date); }
    if(parameters.where_Price){ params = params.append('where_Price', parameters.where_Price); }
    if(parameters.where_Promote){ params = params.append('where_Promote', parameters.where_Promote); }
    if(parameters.where_AvaiableNumberOfPlaces){ params = params.append('where_AvaiableNumberOfPlaces', parameters.where_AvaiableNumberOfPlaces); }
    return this.http.get<any>(this.baseUrl + '/public/Trip', { params: params })
  } else {
    return this.http.get<any>(this.baseUrl + '/public/Trip');
  }  

}

modifyTrip(obj){
  return this.http.patch<any>(this.baseUrl + '/api/v1/Trip/' + obj._id, { 
    id: obj._id, Name: obj.name, City: obj.city, DepartureDate: obj.departureDate, ArrivalDate: obj.arrivalDate, 
    Price: obj.price, Describe: obj.describe, DeparturePlace: obj.departurePlace, NumberOfPlaces: obj.numberOfPlaces,
    AvaiableNumberOfPlaces: obj.availableNumberOfPlaces, Archive: obj.archive, Promote: obj.promote, 
    AverageRating: obj.averageRating, Photos: obj.photos});
}

delTrip(trip:any){
  return this.http.delete<any>(this.baseUrl + '/api/v1/Trip/' + trip._id);
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
  return this.http.post<any>(this.baseUrl + '/auth/login', { Email:email, Password:password });
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


  updateProfile(user: User){
    return this.http.post<any>(this.baseUrl + '/auth/profile' , 
    { _id: user._id, Password: user.Password, FirstName: user.FirstName, LastName: user.LastName },{
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
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
    return this.http.get<any>(this.baseUrl + '/api/v1/Trip');
  }

  postTripAdmin(obj: Trip){
    console.log(obj)
    return this.http.post<any>(this.baseUrl + '/api/v1/Trip', { id: obj._id, 
      Name: obj.name, 
      City: obj.city, DepartureDate: obj.departureDate, ArrivalDate: obj.arrivalDate, 
      Price: obj.price, 
      Describe: obj.describe, 
      DeparturePlace: obj.departurePlace, 
      NumberOfPlaces: obj.numberOfPlaces, 
      AvaiableNumberOfPlaces: obj.availableNumberOfPlaces, 
      Archive: obj.archive, 
      Promote: obj.promote, 
      AverageRating: obj.averageRating, 
      Photos: obj.photos});
  }

  delTripAdmin(trip){
    return this.http.delete<any>(this.baseUrl + '/api/v1/Trip');
  }

/** 
 * URL /api/v1/USER 
*/
  getUserAdmin(){
    return this.http.get<User>(this.baseUrl + '/api/v1/User');
  }

  postUserAdmin(user: User){
    return this.http.post<Trip>(this.baseUrl + '/api/v1/User', { user });
  }

  delUserAdmin(userId: number){
    return this.http.delete<User>(this.baseUrl + '/api/v1/User', {
      params: new HttpParams().set('TripId', userId+"" )
    })
  }
  
  getReservations(){
    return this.http.get<any>(this.baseUrl + '/auth/Trip/Reservation/', {
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
  }

/**
  - Stworz zamowienie jako zalogowany
 * URL POST /auth/Reservation
 * PAYLOAD {TripId, NumberOfPlaces}
 * 
*/
  postReservation(reservation: Reservation){
    return this.http.post<any>(this.baseUrl + '/auth/Reservation', { TripId: reservation.trip._id, NumberOfPlaces: reservation.numberOfPlaces },{
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
  }

/*
 * - Anuluj zamowienie 
 * URL POST /auth/Reservation/cancel
 * PAYLOAD {RezerwationId}
*/
  deleteReservation(reservationId: number){
    return this.http.post<Reservation>(this.baseUrl + '/auth/Reservation/cancel', { RezerwationId: reservationId }, {
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
  }

/*
  * - Oplac zamowienie
  * URL POST /auth/Reservation/pay
  * PAYLOAD {RezerwationId}
  *
*/
  postPayReservation(reservationId: number){
    return this.http.post<Reservation>(this.baseUrl + '/auth/Reservation/pay', { RezerwationId: reservationId }, {
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
  }

/*
  * - Pobierz oceny dla trip
  * URL GET /auth/Rating?TripId
  * EXAMPLE: URL GET /public/Rating?TripId=5c526d35217a680eaa9aed02
  * 
*/
  getRating(tripId: string){
    return this.http.get<any>(this.baseUrl + '/public/Rating', {
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
    return this.http.post<Rating>(this.baseUrl + '/auth/Rating', {Comment: rating.comment, RateMark: rating.rateMark, TripId: rating.trip._id},{
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
  }


 /**   
  * 
  * - usun ocene
  * URL Delete /auth/Rating
  * PAYLOAD {RatingId}
  * 
  */
  deleteRating(ratingId: string){
    return this.http.post<any>(this.baseUrl + '/auth/Rating/cancel', {RatingId: ratingId}, {
      headers: new HttpHeaders().set('Authorization', this.dataService.state.token)
    });
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
  