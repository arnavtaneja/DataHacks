const   express     = require("express"),
        router      = express.Router(),
        userInfo    = require("../models/info");
    
router.get("/", function(req, res){
    res.render("apply");
});


router.post("/jo", function(req, res) {

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;
    
    var info = new userInfo({name: userName, email: userEmail});
    console.log(info)

    info.save(function (err, fluffy) {
        if (err) {
            return console.error(err);
        } else {
            // And forward to success page
            res.redirect("/dashboard");
        }
    });

    // Submit to the DB
    
    
 /*   collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("/dashboard");
        }
    }); 
    
  */

});

module.exports = router;