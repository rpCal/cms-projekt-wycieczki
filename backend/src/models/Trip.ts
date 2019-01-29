import bcrypt from 'bcrypt-nodejs'
import mongoose from 'mongoose' 

export interface ITrip extends mongoose.Document {
    name: string,
};

const tripSchema = new mongoose.Schema({
  name: String,
}, { 
    timestamps: true 
});

const Trip = mongoose.model<ITrip>('Trip', tripSchema);

export default Trip;