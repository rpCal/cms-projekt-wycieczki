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

    static createEmptyTrip(): Trip{
        return new Trip(null,null,null,null,null,null,null,null,null,null,null,null,0,null);
    }

    static createTripFromApiTrip(obj){
        return new Trip(obj.Id, obj.Name, obj.City, obj.DepartureDate, obj.ArrivalDate, obj.Price, obj.Describe, obj.DeparturePlace, obj.NumberOfPlaces, obj.AvailableNumberOfPlaces, obj.Archive, obj.Promote, obj.AverageRating, obj.Photos[0]);
    }
}