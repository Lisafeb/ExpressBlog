var express = require('express');
var router = express.Router();
var Blog = require('../model/schema');
var Comment = require('../model/comment');
var User = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('getting all blogs');
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log(err);

        } else{
            res.render('blogs', {entries: blogs, currentUser: req.user});
        }

    });
});

router.get('/:id', function(req, res){
    console.log('getting one blog post by id');
    Blog.findById(req.params.id).populate("comments").exec(function(err, entry){
            if(err){
                res.send('error occured');
                console.log('error');
            } else{
                console.log('this is the blog' + entry);
                res.render('entry', {entry: entry});
            }
        })
});

router.post('/', isLoggedIn, function (req, res) {
    var author = req.body.author;
    var title = req.body.title;
    var body = req.body.body;
    var image = req.body.image;
    var newBlog = {author:author, title:title, body:body, image:image}
    console.log(newBlog);
    Blog.create(newBlog, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/blogs");
        }
    });
});

router.get("/:id/new-comment", isLoggedIn, function(req, res){
    // find campground by id
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.render("new-comment", {blog: blog});
        }
    })
});

router.post("/:id", function(req, res){
    //lookup campground using ID
    Blog.findById(req.params.id, function(err, blog){
        console.log("this is a newly posted comment1");
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else {
            console.log("this is a newly posted comment2");
            var comm = req.body.comm;
            var commentAuthor = req.body.commentAuthor;
            var newComment = {comm:comm, commentAuthor:commentAuthor}
            Comment.create(newComment, function(err, comment){
                if(err){
                    console.log(err);
                    console.log("this is a newly posted comment3", req.body.comm, ' ', req.body.commentAuthor);
                } else {
                    blog.comments.push(comment._id);
                    console.log("this is a newly posted comment4",  req.body.comm, ' ', req.body.commentAuthor);
                    blog.save();
                    res.redirect('/blogs/' + blog._id);
                }
            });
        }
    });
    //create new comment
    //connect new comment to campground
    //redirect campground show page
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}
module.exports = router;
