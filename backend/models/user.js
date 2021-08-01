const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        default: '',
        required: true,
        unique: true
    },
    email: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        default: '',
        required: true
    },
    
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User', userSchema);