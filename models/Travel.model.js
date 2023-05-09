const { Schema, model } = require('mongoose');

const travelSchema = new Schema({
    country: {
        type: String,
        required: [true, "Country is required."],
    },
    city: {
        type: String,
        required: [true, "City is required."],
    },
    startDate: {
        type: Date,
        required: [true, "Start date is required."],
    },
    endDate: {
        type: Date,
        required: [true, "End date is required."],
    },
    budget: {
        type: Number,
        required: [true, "Budget is required."],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
    }]
}, {
    timestamps: true
});

const Travel = model("Travel", travelSchema);


module.exports = Travel;