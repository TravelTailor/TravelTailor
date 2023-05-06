const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
}, {
    timestamps: true
});

const Travel = mongoose.model("Travel", travelSchema);


module.exports = Travel;