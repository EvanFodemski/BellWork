const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');


const liftSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: true,
        trim: true,
    },
    liftText: {
        type: String,
        required: true,
        trim: true,
    },
    liftType: {
        type: String,
        enum: ['Upper Body', 'Lower Body', 'Cardio', 'Full Body', 'Other'],
    },
    createdAt: {
        type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
    },

    excercises: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            sets: {
                type: Number,
                required: true,
                min: 1,
                max: 99,
            },
            reps: {
                type: Number,
                required: true,
                min: 1,
                max: 99,
            },
            specifics: {
                type: String,
                // Ie. If you dont have a barbell bench press use dumbells
            },
        },
    ],
});

const Lift = model('Lift', liftSchema);

module.exports = Lift;

