var mongoose = require('mongoose');



var blogSchema = new mongoose.Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    date: { type: Date, default: Date.now },
    image: String,

});
module.exports = mongoose.model('Blog', blogSchema);