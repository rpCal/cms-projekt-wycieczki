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
}
