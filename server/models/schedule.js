const { Schema, model, default: mongoose } = require('mongoose');


const scheduleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    days: [{
        type: Schema.Types.ObjectId,
        ref: 'Day'
    }]
    

    
});


const Schedule = model('Schedule', scheduleSchema);

module.exports = Schedule;