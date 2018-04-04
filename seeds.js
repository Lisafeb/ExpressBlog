var mongoose = require("mongoose");
var Blog = require("./model/schema");
var Comment   = require("./model/comment");

var data = [
    {
        title: "NextM comes to Copenhagen April 18, 19",
        author: "Tom",
        image: "https://farm2.static.flickr.com/1561/25490107112_93e547e339.jpg",
        body: "COPENHAGEN April 18-19, 2018 NextM is a forum to inspire new thinking, ignite conversation and deliver exposure to original concepts. We set the stage for GroupM agencies, clients and media partners to amplify innovative ideas, identify opportunities and continue the conversation as it relates to their brand and business."
    },
    {
        title: "Hannover Messe",
        author: "lisa",
        image:"http://daguerre.messe.de/mediathek/preview.php?screenClass=large&videoID=8814",
        body: "The Hannover Messe is one of the worlds largest trade fairs. It is held on the Hanover Fairground in Hanover, Lower Saxony, Germany. Typically, there are about 6,500 exhibitors and 250,000 visitors. The Hannover Messe started in 1947 in an undamaged factory building in Laatzen, south of Hanover, by an arrangement of the British military government in order to boost the economic advancement of post-war Germany. The first fair was colloquially known as Fischbrötchenmesse (Fischbrötchen fair) due to the exemptions in food rationing for the fair at this time. It proved hugely successful and was hence repeated on a yearly basis, contributing largely to the success of the Hanover fairground in replacing the then-East German city of Leipzig as the new major fair city for West Germany. In the 1980s, the growing information and telecommunication industry demanded the organizer Deutsche Messe AG to split the fair. The CeBIT is a successful spin-off of the Hannover Messe. "
    },

]

function seedDB(){
    //Remove all posts
    Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed posts!");
        Comment.remove({}, function(err) {
            if(err){
                console.log(err);
            }
            console.log("removed comments!");
            //add a few posts
            data.forEach(function(seed){
                Blog.create(seed, function(err, blog){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a post");
                        //create a comment
                        Comment.create(
                            {
                                comm: "Great event!",
                                commentAuthor: "Tom"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    blog.comments.push(comment);
                                    blog.save();
                                    console.log("Created new comment");
                                }
                            });
                    }
                });
            });
        });
    });
    //add a few comments
}

module.exports = seedDB;