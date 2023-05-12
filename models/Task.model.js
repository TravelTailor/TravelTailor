const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    task: {
        type: String,
        required: [true, "Task is required."],
    },
    date: {
        type: Date,
        required: [true, "Date is required."],
    },
    status: {
        type: String,
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