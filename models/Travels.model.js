const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: {
        type: String,
        required: [true, "City name is required."],
    },
    country: {
        type: String,
        required: [true, "Country is required."],
    },
    lat: {
        type: Number,
        required: [true, "Latitude is required."],
    },
    lon: {
        type: Number,
        required: [true, "Longitude is required."],
    },
    population: {
        type: Number,
        required: [true, "Population is required."],
    },
    timezone: {
        type: String,
        required: [true, "Timezone is required."],
    },
    status: {
        type: String,
        enum: ["visited", "to visit"],
        default: "to visit",
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

const City = mongoose.model("City", citySchema);


module.exports = City;