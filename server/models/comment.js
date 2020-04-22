const mongoose = require('mongoose');

const comment = new mongoose.Schema({
    content: String,
    date: {type: Date, default: Date.now()},
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
})

module.exports = comment;