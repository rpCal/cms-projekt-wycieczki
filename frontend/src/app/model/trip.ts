export class Trip {
    
    constructor(
        public _id: string,
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
        const trip = new Trip(obj._id, obj.Name,
             obj.City, obj.DepartureDate, obj.ArrivalDate, obj.Price, obj.Describe,
              obj.DeparturePlace, obj.NumberOfPlaces, obj.AvaiableNumberOfPlaces, 
              obj.Archive, obj.Promote, obj.AverageRating, obj.Photos[0]);
        return trip;
    }
}