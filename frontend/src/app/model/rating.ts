import { User } from './user';
import { Trip } from 'src/app/model/trip';
export class Rating {
    constructor(
        public _id: string,
        public comment: string,
        public rateMark: number,
        public trip: Trip,
        public user: User
    ){};


    static createFromApi(obj){
        let user = obj.User ? new User({ 
            _id: obj.User._id,
            FirstName: obj.User.FirstName,
            LastName: obj.User.LastName,
            Email: obj.User.Email
        }) : null;
        return new Rating(obj._id, obj.Comment, obj.RateMark, null, user);
    }
}
