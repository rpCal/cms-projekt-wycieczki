export class Trip {
    id: number;
    name: string;
    city: string;
    departureDate: Date;
    arrivalDate: Date;
    price: number;
    describe: string;
    departurePlace: string;
    numberOfPlaces: number;
    availableNumberOfPlaces: number;
    archive: boolean;
    promote: number;

    constructor(name: string, city: string, departureDate: Date, arrivalDate: Date, price: number, describe: string, departurePlace: string, numberOfPlaces: number, availableNumberOfPlaces: number, archive: boolean, promote: number) {
    
    this.name = name;
    this.city = city;
    this.departureDate = departureDate;
    this.arrivalDate = arrivalDate;
    this.price = price;
    this.describe = describe;
    this.departurePlace = departurePlace;
    this.numberOfPlaces = numberOfPlaces;
    this.availableNumberOfPlaces = availableNumberOfPlaces;
    this.archive = archive;
    this.promote = promote;
    }
}
