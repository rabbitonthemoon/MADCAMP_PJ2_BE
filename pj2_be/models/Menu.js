const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const menuSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    restaurant: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    fav_name: {
        type: Schema.Types.ObjectId,
        ref:'Friends'
    },
});

//db 모델 정의
const Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;