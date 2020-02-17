const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
    userId: String,
    title: String,
    description: String,
    iconUrl: String,
    username: String,
    rating: Number,
    distance: Number,
    date: Date,
    archived: Boolean,
    image: { type : Array , "default" : [] }
});

module.exports = mongoose.model('Listing', ListingSchema);
