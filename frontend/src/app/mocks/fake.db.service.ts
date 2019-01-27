import { RezerwationComponent } from './../main/rezerwation/rezerwation.component';
import { Injectable } from '@angular/core';
import { Trip } from '../model/trip';
import { Reservation } from '../model/reservation';

@Injectable({
  providedIn: 'root',
})
export class FakeDb {
  createTrips() {
    const fakeTrips: Array<Trip> = [
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289221', 'Super Warszawa',  'Warszawa', new Date(2019, 1, 5), new Date(2019, 1,10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 10, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289222', 'Łódzki odkrywca',  'Łódź', new Date(2019, 1, 5), new Date(2019, 1,12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 3, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289223', 'Gastro Wrocław', 'Wrocław', new Date(2019, 1, 7), new Date(2019, 1, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 10, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289224', 'Rycerski Kraków', 'Kraków', new Date(2019, 1, 7), new Date(2019, 1,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 6, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289225', 'Super Warszawa',  'Warszawa', new Date(2019, 2, 5), new Date(2019, 2,10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 2, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289226', 'Łódzki odkrywca',  'Łódź', new Date(2019, 2, 5), new Date(2019, 2,12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 1, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289227', 'Gastro Wrocław', 'Wrocław', new Date(2019, 2, 7), new Date(2019, 2, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 1, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289228', 'Rycerski Kraków', 'Kraków', new Date(2019, 2, 7), new Date(2019, 2,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 2, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289229', 'Super Warszawa',  'Warszawa', new Date(2019, 3, 5), new Date(2019, 3, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 4, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce289220', 'Łódzki odkrywca',  'Łódź', new Date(2019, 3, 5), new Date(2019, 1, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 3, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922q', 'Gastro Wrocław', 'Wrocław', new Date(2019, 3, 7), new Date(2019, 3, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 1, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922w', 'Rycerski Kraków', 'Kraków', new Date(2019, 3, 7), new Date(2019, 1, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922e', 'Mazurskie Wariactwo', 'Kuty', new Date(2019, 3, 1),new Date(2019, 3, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922r', 'Super Warszawa',  'Warszawa', new Date(2019, 4, 5), new Date(2019, 4, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 10, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922t', 'Łódzki odkrywca',  'Łódź', new Date(2019, 4, 5), new Date(2019, 4, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 6, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922y', 'Gastro Wrocław', 'Wrocław', new Date(2019, 4, 7), new Date(2019, 4, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 15, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922u', 'Rycerski Kraków', 'Kraków', new Date(2019, 4, 7), new Date(2019, 4, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922i', 'Majowe Mazurskie Żeglowanie', 'Giżycko', new Date(2019, 5, 1),new Date(2019, 5, 5), 1500, "Piracka przygoda na łajbach", "Kraków", 15, 4, false, 1, "http://tu.url.do.zdjęcia.html"),  
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922o', 'Super Warszawa',  'Warszawa', new Date(2019, 5, 5), new Date(2019, 5, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922p', 'Łódzki odkrywca',  'Łódź', new Date(2019, 5, 5), new Date(2019, 5, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 0, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922a', 'Gastro Wrocław', 'Wrocław', new Date(2019, 5, 7), new Date(2019 ,5, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922s', 'Rycerski Kraków', 'Kraków', new Date(2019, 5, 7), new Date(2019, 5, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922d', 'Mazurskie Wariactwo', 'Kuty', new Date(2019, 5, 1),new Date(2019, 5, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922f', 'Super Warszawa',  'Warszawa', new Date(2019, 6, 5), new Date(2019, 6, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922g', 'Łódzki odkrywca',  'Łódź', new Date(2019, 6, 5), new Date(2019, 6, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 0, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922h', 'Gastro Wrocław', 'Wrocław', new Date(2019, 6, 7), new Date(2019, 6, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922j', 'Rycerski Kraków', 'Kraków', new Date(2019, 6, 7), new Date(2019, 6,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('c5a7bf94-01ee-4770-9bab-86ecce28922k', 'Mazurskie Wariactwo', 'Kuty', new Date(2019, 6, 1),new Date(2019, 6, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
    ];
    return fakeTrips;
  }

  createRezerwation() {
    const fakeRezerwation: Array<Trip> = [
    ];
    return fakeRezerwation;
  }

}
