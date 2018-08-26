"use strict";
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({

    password: { type: String },
    name: { type: String },
    email: { type: String },
    token: { type: String },
    status: {
        type: String,
        enum: [
            'active', 'inactive'
        ],
        default: 'active'
    },
    role: {
        type: String,
        enum: [
            'admin', 'normal'
        ],
        default: 'normal'
    }
}, { timestamps: true });

const user = mongoose.model('user', userSchema);
exports.user = user;