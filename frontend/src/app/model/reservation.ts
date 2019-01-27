import { User } from './user';
import { Trip } from './trip';
export class Reservation {
    constructor(public trip: Trip, user: User){};
}
