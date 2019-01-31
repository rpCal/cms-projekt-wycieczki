export class Trip {
    
    constructor(
        public id: number,
        public name: string, 
        public city: string, 
        public departureDate: Date, 
        public arrivalDate: Date, 
        public price: number,
        public describe: string, 
        public departurePlace: string, 
        public numberOfPlaces: number, 
        public availableNumberOfPlaces: number, 
        public archive: boolean, 
        public promote: number,
        public averageRating: number, 
        public photos: string) {
    }

    static getEmptyTrip(): Trip{
        return new Trip(null,null,null,null,null,null,null,null,null,null,null,null,null,null);
    }

}