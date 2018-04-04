var mongoose = require("mongoose");


var commentSchema = new mongoose.Schema({
    commentAuthor: String,
    comm: String,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment',commentSchema);