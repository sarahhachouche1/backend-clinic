const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true
    },
  
});

module.exports = mongoose.model('reviews',ReviewsSchema)