const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    travel_id: {
        type: String,
        required: [true, "Travel_ID is required."],
    },
    task: {
        type: String,
        required: [true, "Task is required."],
    },
    date: {
        type: Date,
        required: [true, "Date is required."],
    },
    status: {
        type: Boolean,
        required: [true, "Status is required."],
    },
    price: {
        type: Number,
        required: [true, "Price is required."],
    },
    travel: {
        type: Schema.Types.ObjectId,
        ref: "Travel",
    },
}, {
    timestamps: true
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;