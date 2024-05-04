const { Schema, model, default: mongoose } = require('mongoose');


const scheduleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    day: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Lift'
        }
    ]
    

    
});


const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;