const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
    },
    description: String,
    isCompleted: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model('Task', taskSchema);
