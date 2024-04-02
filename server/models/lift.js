const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');


const liftSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        required: false,
        trim: true,
    },
    liftComments: {
        type: String,
        required: true,
        trim: true,
    },
    likes: {
        type: Number,
        required: false,
    },
    dislikes: {
        type: Number,
        required: false,
    },
    targets: {
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
            },
            reps: {
                type: Number,
                required: true,
            },
            comments: {
                type: String,
                required: false,
                trim: true,
            },
        }
    ]


});

const Lift = model('Lift', liftSchema);

module.exports = Lift;

