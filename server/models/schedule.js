const { Schema, model, default: mongoose } = require('mongoose');


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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Lift'
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