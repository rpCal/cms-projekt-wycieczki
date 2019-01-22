import { Injectable } from '@angular/core';
import { Trip } from '../model/trip';

@Injectable({
  providedIn: 'root',
})
export class FakeDb {
  createDb() {
    const fakeTrips: Array<Trip> = [
      new Trip('Super Warszawa',  'Warszawa', new Date(2019, 1, 5), new Date(2019, 1,10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 10, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Łódzki odkrywca',  'Łódź', new Date(2019, 1, 5), new Date(2019, 1,12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 3, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Gastro Wrocław', 'Wrocław', new Date(2019, 1, 7), new Date(2019, 1, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 10, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Rycerski Kraków', 'Kraków', new Date(2019, 1, 7), new Date(2019, 1,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 6, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Super Warszawa',  'Warszawa', new Date(2019, 2, 5), new Date(2019, 2,10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 2, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Łódzki odkrywca',  'Łódź', new Date(2019, 2, 5), new Date(2019, 2,12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 1, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Gastro Wrocław', 'Wrocław', new Date(2019, 2, 7), new Date(2019, 2, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 1, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Rycerski Kraków', 'Kraków', new Date(2019, 2, 7), new Date(2019, 2,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 2, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Super Warszawa',  'Warszawa', new Date(2019, 3, 5), new Date(2019, 3, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 4, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Łódzki odkrywca',  'Łódź', new Date(2019, 3, 5), new Date(2019, 1, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 3, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Gastro Wrocław', 'Wrocław', new Date(2019, 3, 7), new Date(2019, 3, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 1, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Rycerski Kraków', 'Kraków', new Date(2019, 3, 7), new Date(2019, 1, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Mazurskie Wariactwo', 'Kuty', new Date(2019, 3, 1),new Date(2019, 3, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Super Warszawa',  'Warszawa', new Date(2019, 4, 5), new Date(2019, 4, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 10, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Łódzki odkrywca',  'Łódź', new Date(2019, 4, 5), new Date(2019, 4, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 6, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Gastro Wrocław', 'Wrocław', new Date(2019, 4, 7), new Date(2019, 4, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 15, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Rycerski Kraków', 'Kraków', new Date(2019, 4, 7), new Date(2019, 4, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Majowe Mazurskie Żeglowanie', 'Giżycko', new Date(2019, 5, 1),new Date(2019, 5, 5), 1500, "Piracka przygoda na łajbach", "Kraków", 15, 4, false, 1, "http://tu.url.do.zdjęcia.html"),  
      new Trip('Super Warszawa',  'Warszawa', new Date(2019, 5, 5), new Date(2019, 5, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Łódzki odkrywca',  'Łódź', new Date(2019, 5, 5), new Date(2019, 5, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 0, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Gastro Wrocław', 'Wrocław', new Date(2019, 5, 7), new Date(2019 ,5, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Rycerski Kraków', 'Kraków', new Date(2019, 5, 7), new Date(2019, 5, 10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Mazurskie Wariactwo', 'Kuty', new Date(2019, 5, 1),new Date(2019, 5, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Super Warszawa',  'Warszawa', new Date(2019, 6, 5), new Date(2019, 6, 10), 700, 'Poznaj warszawe od zupełnie innej strony',  'Warszawa',  15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Łódzki odkrywca',  'Łódź', new Date(2019, 6, 5), new Date(2019, 6, 12),  1500, "Łódzka wyprawa po muzeach ", "Warszawa", 10, 0, false , 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Gastro Wrocław', 'Wrocław', new Date(2019, 6, 7), new Date(2019, 6, 12), 2500, "Podróż po najlepszych restauracjach i knajpach we Wrocławi", "Wrocław", 15, 0, false, 0,  "http://tu.url.do.zdjęcia.html"),
      new Trip('Rycerski Kraków', 'Kraków', new Date(2019, 6, 7), new Date(2019, 6,10), 1500, "Poznaj najciekawsze rycerskie zamkamarki krakowa", "Warszawa", 20, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
      new Trip('Mazurskie Wariactwo', 'Kuty', new Date(2019, 6, 1),new Date(2019, 6, 5), 1500,"Surwiwalowa przygoda na Mazurach", "Gdańsk", 15, 0, false, 0, "http://tu.url.do.zdjęcia.html"),
    ];
    return fakeTrips;
  }
}
