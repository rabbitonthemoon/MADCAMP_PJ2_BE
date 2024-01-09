const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    passwd: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
});

//db 모델 정의
const User = mongoose.model('User', userSchema);
module.exports = User;