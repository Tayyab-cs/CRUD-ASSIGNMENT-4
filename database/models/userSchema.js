const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.set('strictQuery', 'true');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: [true, 'Email is required'],
        type: String,
        unique: true
    },
    password: {
        required: [true, 'Password is required'],
        type: String
    }
});

// Pre Method for hashing password before creating new user.
userSchema.pre('save', async function (next) {
    const saltRounds = 11;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    console.log('Hashed Password:', hashedPassword);

    this.password = hashedPassword;
    next();
});

// Pre Method for hashing updated password before saving it.
userSchema.pre("findOneAndUpdate", async function (next) {
    try {
      if (this._update.password) {
        const hashed = await bcrypt.hash(this._update.password, 10);
        this._update.password = hashed;
      }
      next();
    } catch (err) {
      return next(err);
    }
});

module.exports = mongoose.model('User', userSchema);