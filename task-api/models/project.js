"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    name: { type: String },
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, { timestamps: true });

const project = mongoose.model('project', projectSchema);
exports.project = project;