"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sprintSchema = new Schema({
    name: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'project' }
}, { timestamps: true });

const sprint = mongoose.model('sprint', sprintSchema);
exports.sprint = sprint;