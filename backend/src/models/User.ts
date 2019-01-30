import bcrypt from 'bcrypt-nodejs'
import crypto from 'crypto';
import mongoose from 'mongoose' 
const Types = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  FirstName: {type: Types.String, access: 'public', required: true },
  LastName: {type: Types.String, access: 'public', required: true },
  Email: {type: Types.String, access: 'public', required: false, unique: true},
  Password: {type: Types.String, access: 'public', required: false},
  PasswordResetToken: {type: Types.String, access: 'public', required: false},
  PasswordResetExpires: {type: Types.Date, access: 'public', required: false},
  Tokens:  [{accessToken: Types.String}, {kind: Types.String}], 
  Profile: {
    Name: Types.String,
    Gender: Types.String,
    Location: Types.String,
    Website: Types.String,
    Picture: Types.String
  },
  Reservations: [{ type: Types.ObjectId, ref: 'Reservation', access: 'public', }],
}, { timestamps: true });




userSchema.pre('save', function save(next) {
  const user = this as any;
  if (!user.isModified('Password')) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(user.Password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      user.Password = hash;
      next();
    });
  });
});


userSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.Password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

userSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.Email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash('md5').update(this.Email).digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const User = mongoose.model('User', userSchema);

export default User



// export const User: UserType = mongoose.model<UserType>('User', userSchema);
// const User = mongoose.model('User', userSchema);

// export interface IUser extends mongoose.Document {
//     email: {type: String, access: 'public', required: true},
//     password: {type: String, access: 'private', required: false},
//     passwordResetToken: {type: String, access: 'private', required: false},
//     passwordResetExpires: {type: Date, access: 'private', required: false},

//     facebook: {type: String, access: 'private', required: false},
//     tokens: [{accessToken: String}, {kind: String}],

//     profile: {
//         name: string,
//         gender: string,
//         location: string,
//         website: string,
//         picture: string
//     },

//     comparePassword: comparePasswordFunction,
//     gravatar: (size: number) => string
// };

// type comparePasswordFunction = (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void;

// export type AuthToken = {
//   accessToken: string,
//   kind: string
// };