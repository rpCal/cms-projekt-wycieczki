import mongoose from 'mongoose' 
const Types = mongoose.Schema.Types;

const RatingSchema = new mongoose.Schema({
    Comment: {type: Types.String, access: 'public', required: false},
    RateMark: {type: Types.String, access: 'public', required: true, enum: ['VeryPoor', 'Poor', 'Good', 'VeryGood', 'Excelent']},
    Trip: { type: Types.ObjectId, ref: 'Trip' },
}, { 
    timestamps: true 
});

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
