const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
    lifts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lift'
        },
    ],
});

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});
    
    userSchema.methods.isCorrectPassword = async function (password) {
        return bcrypt.compare(password, this.password);
    };

const User = model('User', userSchema);

module.exports = User