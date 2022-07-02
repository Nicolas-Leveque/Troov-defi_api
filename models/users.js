const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 8
    },
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
    const user = this;
    if ( user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
