import mongoose from 'mongoose' 
const Types = mongoose.Schema.Types;

const RatingSchema = new mongoose.Schema({
    Comment: {type: Types.String, access: 'public', required: false},
    RateMark: {type: Types.Number, access: 'public', required: true},
    Trip: { type: Types.ObjectId, ref: 'Trip' },
    User: { type: Types.ObjectId, ref: 'User' },
}, { 
    timestamps: true 
});

const Rating = mongoose.model('Rating', RatingSchema);

export default Rating;
