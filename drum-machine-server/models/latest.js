const mongoose = require("mongoose");

const latestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    bpm: {
        type: Number,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    sub: {
        type: String,
        required: true
    },
    beat: {}
});

const Latest = mongoose.model('Latest', latestSchema);
module.exports = Latest;