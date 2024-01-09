const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const friendsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
});

//db 모델 정의
const Friends = mongoose.model('Friends', friendsSchema);
module.exports = Friends;