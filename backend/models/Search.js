const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
    handle: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    lastSearched: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Search', searchSchema);
