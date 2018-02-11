const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    sub: {
        type: String,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    beats: [{
        title: {
            type: String,
            unique: true
        },
        bpm: Number,
        beat: {},
        timestamps: true
    }]
})

const User = mongoose.model('User', userSchema);
module.exports = User;