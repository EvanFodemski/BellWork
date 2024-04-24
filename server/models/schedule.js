const { Schema, model } = require('mongoose');


const scheduleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    days: [
        {
            amount: {
                type: Number,
                required: true,
            },
            excercise : {
                type: String,
                required: false,
                trim: true,
            },
        }
    ],
    scheduleComments: {
        type: String,
        required: false,
        trim: true,
    }
});


const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;