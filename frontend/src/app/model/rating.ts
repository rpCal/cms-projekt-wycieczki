import { User } from './user';
import { Trip } from 'src/app/model/trip';
export class Rating {
    constructor(
        public id: number,
        public comment: string,
        public rateMark: number,
        public trip: Trip,
        public user: User
    ){};
}
