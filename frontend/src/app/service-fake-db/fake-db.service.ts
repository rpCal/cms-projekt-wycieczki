import { Rating } from './../model/rating';
import { Trip } from './../model/trip';
import { Reservation } from './../model/reservation';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class FakeDbService {

  constructor() { }

  trip1 = new Trip(1, 'Super Warszawa',  'Warszawa', new Date(2019, 1, 5), new Date(2019, 1,10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 10, false, 0, 3.42,  "http://tu.url.do.zdjęcia.html");
  trip2 = new Trip(2, 'Łódzki odkrywca',  'Łódź', new Date(2019, 1, 5), new Date(2019, 1,12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 3, false , 0, 3.41, "http://tu.url.do.zdjęcia.html");
  user1 = new User({Id: 1, Email: 'test@test.pl', Password: 'haslo', FirstName: 'Jan', LastName: 'Nowak'});
  user2 = new User({Id: 1, Email: 'test@test.pl', Password: 'haslo', FirstName: 'Janusz', LastName: 'Kowalski'});
  
  createTrips() {
    const fakeTrips: Array<Trip> = [
      this.trip1,
      this.trip2,
      new Trip(3, 'Gastro Wrocław', 'Wrocław', new Date(2019, 1, 7), new Date(2019, 1, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 10, false, 4, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(4, 'Rycerski Kraków', 'Kraków', new Date(2019, 1, 7), new Date(2019, 1,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 6, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
      new Trip(5, 'Super Warszawa',  'Warszawa', new Date(2019, 2, 5), new Date(2019, 2,10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 2, false, 0, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(6, 'Łódzki odkrywca',  'Łódź', new Date(2019, 2, 5), new Date(2019, 2,12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 1, false , 0, 3.41, "http://tu.url.do.zdjęcia.html"),
      new Trip(7, 'Gastro Wrocław', 'Wrocław', new Date(2019, 2, 7), new Date(2019, 2, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 1, false, 4, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(8, 'Rycerski Kraków', 'Kraków', new Date(2019, 2, 7), new Date(2019, 2,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 2, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
      new Trip(9, 'Super Warszawa',  'Warszawa', new Date(2019, 3, 5), new Date(2019, 3, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 4, false, 3.41, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip(10, 'Łódzki odkrywca',  'Łódź', new Date(2019, 3, 5), new Date(2019, 1, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 3, false , 0, 3.41, "http://tu.url.do.zdjęcia.html"),
      new Trip(11, 'Gastro Wrocław', 'Wrocław', new Date(2019, 3, 7), new Date(2019, 3, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 1, false, 0, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(12, 'Rycerski Kraków', 'Kraków', new Date(2019, 3, 7), new Date(2019, 1, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
      new Trip(13, 'Mazurskie Wariactwo', 'Kuty', new Date(2019, 3, 1),new Date(2019, 3, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, 3.41, "http://tu.url.do.zdjęcia.html"),
      new Trip(14, 'Super Warszawa',  'Warszawa', new Date(2019, 4, 5), new Date(2019, 4, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 10, false, 0, 3.41,  "http://tu.url.do.zdjęcia.html"),
      new Trip(15, 'Łódzki odkrywca',  'Łódź', new Date(2019, 4, 5), new Date(2019, 4, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 6, false , 0, 3.41, "http://tu.url.do.zdjęcia.html"),
      new Trip(16, 'Gastro Wrocław', 'Wrocław', new Date(2019, 4, 7), new Date(2019, 4, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 15, false, 2, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(17, 'Rycerski Kraków', 'Kraków', new Date(2019, 4, 7), new Date(2019, 4, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
      new Trip(18, 'Majowe Mazurskie Żeglowanie', 'Giżycko', new Date(2019, 5, 1),new Date(2019, 5, 5), 1500, "Piracka przygoda na łajbach", "Kraków", 15, 4, false, 3.41, 1, "http://tu.url.do.zdjęcia.html"),  
      new Trip(19, 'Super Warszawa',  'Warszawa', new Date(2019, 5, 5), new Date(2019, 5, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 0, false, 0, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(20, 'Łódzki odkrywca',  'Łódź', new Date(2019, 5, 5), new Date(2019, 5, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 0, false , 0, 3.41, "http://tu.url.do.zdjęcia.html"),
      new Trip(21, 'Gastro Wrocław', 'Wrocław', new Date(2019, 5, 7), new Date(2019 ,5, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 0, false, 0, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(22, 'Rycerski Kraków', 'Kraków', new Date(2019, 5, 7), new Date(2019, 5, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
      new Trip(23, 'Mazurskie Wariactwo', 'Kuty', new Date(2019, 5, 1),new Date(2019, 5, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 3.41, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip(24, 'Super Warszawa',  'Warszawa', new Date(2019, 6, 5), new Date(2019, 6, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 0, false, 1, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(25, 'Łódzki odkrywca',  'Łódź', new Date(2019, 6, 5), new Date(2019, 6, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 0, false , 0, 3.41,  "http://tu.url.do.zdjęcia.html"),
      new Trip(26, 'Gastro Wrocław', 'Wrocław', new Date(2019, 6, 7), new Date(2019, 6, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 0, false, 0, 3.42,  "http://tu.url.do.zdjęcia.html"),
      new Trip(27, 'Rycerski Kraków', 'Kraków', new Date(2019, 6, 7), new Date(2019, 6,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
      new Trip(28, 'Mazurskie Wariactwo', 'Kuty', new Date(2019, 6, 1),new Date(2019, 6, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, 3.42, "http://tu.url.do.zdjęcia.html"),
    ];
    return fakeTrips;
  }

  createRezerwation() {
    const fakeRezerwation: Array<Reservation> = [
      new Reservation(1, false, 7, this.trip1, this.user1),
      new Reservation(1, true, 6, this.trip2, this.user1),
      new Reservation(1, true, 6, this.trip2, this.user2),
    ];
    return fakeRezerwation;
  }

  createRating() {
    const fakeRating: Array<Rating> = [
      new Rating(1, "super wycieczka polecam !", 5, this.trip1, this.user1),  
      new Rating(2, "słabuitko...", 1, this.trip1, this.user2),  
    ];
  return fakeRating;
  }

}
