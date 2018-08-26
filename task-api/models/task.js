"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String },
    description: { type: String },
    estimate: { type: String },
    taskType: {
        type: String,
        enum: [
            'story', 'issue', 'bug'
        ],
        default: 'issue'
    },
    status: {
        type: String,
        enum: [
            'todo', 'inProgress', 'inTesting', 'done'
        ],
        default: 'todo'
    },
    reporter: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    assigne: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'project' },
    sprint: { type: mongoose.Schema.Types.ObjectId, ref: 'sprint' },
}, { timestamps: true });

const task = mongoose.model('task', taskSchema);
exports.task = task;