import { User } from './user';
import { Trip } from './trip';
export class Reservation {
    constructor(
        public _id: number,
        public isPayed: boolean,
        public numberOfPlaces: number,
        public trip: Trip,
        public user: User 
    
    ){};


    static createFromApi(obj){
        let trip = obj.Trip ? Trip.createTripFromApiTrip(obj.Trip) : null
        return new Reservation(obj._id, obj.IsPayed, obj.NumberOfPlaces, trip, null);
    }
}
