import mongoose from 'mongoose' 
const Types = mongoose.Schema.Types;

const ReservationSchema = new mongoose.Schema({
    IsPayed: { type: Types.Boolean, access: 'public', required: true },
    Trip: { type: Types.ObjectId, ref: 'Trip', access: 'public', required: true },
    User: { type: Types.ObjectId, ref: 'User', access: 'public', required: true },
}, { 
    timestamps: true 
});

const Reservation = mongoose.model('Reservation', ReservationSchema);

export default Reservation;