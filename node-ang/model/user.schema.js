const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/data');

const model = new mongoose.Schema({
   
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {

        type: String,
        required: true
    },
    
});

const UserSchema1 = new mongoose.model('user',model);

module.exports = UserSchema1;