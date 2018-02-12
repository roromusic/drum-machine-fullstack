const mongoose = require("mongoose");

const latestSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Latest = mongoose.model('Latest', latestSchema);
module.exports = Latest;