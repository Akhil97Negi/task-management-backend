const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending'},

}, { timestamps: true })

const taskModel = mongoose.model('task', taskSchema)

module.exports = taskModel