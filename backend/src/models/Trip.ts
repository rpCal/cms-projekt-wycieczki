import mongoose from 'mongoose' 
const Types = mongoose.Schema.Types;

const TripSchema = new mongoose.Schema({
    Name: {type: Types.String, access: 'public', required: true},
    City: {type: Types.String, access: 'public', required: true}, 
    DepartureDate: {type: Types.Date, access: 'public', required: true},
    ArrivalDate: {type: Types.Date, access: 'public', required: true},
    Price: {type: Types.Number, access: 'public', required: true},
    Describe: {type: Types.String, access: 'public'},
    DeparturePlace: {type: Types.String, access: 'public'},
    NumberOfPlaces: {type: Types.Number, access: 'public', required: true},
    AvaiableNumberOfPlaces: {type: Types.Number, access: 'public', required: true},
    Archive: {type: Types.Boolean, access: 'public'},
    Promote: {type: Types.Number, access: 'public'},
    AverageRating: {type: Types.String, access: 'public'},

    
    Reservations: [{ type: Types.ObjectId, ref: 'Reservation' }],
    Ratings: [{ type: Types.ObjectId, ref: 'Rating' }],
}, { 
    timestamps: true 
});

const Trip = mongoose.model('Trip', TripSchema);

export default Trip;


// @TODO:ADD FIELDS
// Reservations: [{ type: Types.ObjectId, ref: 'Person' }],
// Ratings: [{ type: Types.ObjectId, ref: 'Person' }]


// export interface ITrip extends mongoose.Document {
//     name: string,
// };

// TripSchema.method('toJSON', function() {
//     var obj = this.toObject();
//     delete obj.salt;
//     delete obj.hash;
//     delete obj.__v;
//     return obj;
// });