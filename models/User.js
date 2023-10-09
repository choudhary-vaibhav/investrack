//Collection Structure
const { SchemaTypes } = require('mongoose');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const portfolioSchema = new Schema({
    'name': {
        type: SchemaTypes.String,
        required: true,
        trim: true,
    },
    'issueDate': {
        type: SchemaTypes.String,
        required: true,
        trim: true,
    },
    'value': {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
    'rate': {
        type: SchemaTypes.Number,
        min: 0,
        required: true,
    },
    'period': {
        type: SchemaTypes.Number,
        min: 0,
        max: 30,
        required: true,
    },
    'type': {
        type: SchemaTypes.String,
        required: true,
        enum: ['SI','CI'],
    }
})

const userSchema = new Schema({
    'name': {
        type: SchemaTypes.String,
        required: [true, "name not provided "],
        trim: true,
    },
    'email': {
        type: SchemaTypes.String,
        required: [true, "email not provided "],
        unique: [true, "email already exists "],
        lowercase: true,
        trim: true,
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email! '
          }
    },
    'password': {
        type: SchemaTypes.String,
        required: true,
    },
    'portfolio': [portfolioSchema]
});

const User = mongoose.model('user', userSchema);
module.exports = User;