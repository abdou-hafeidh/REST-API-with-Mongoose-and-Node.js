const mongoose = require('mongoose');

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    name: String,
    lastname: String,
    role: String,
    todos: Object  [{ title: String, done: Boolean }]
    

});



module.exports = user;