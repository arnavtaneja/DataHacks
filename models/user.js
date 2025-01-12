var mongoose = require('mongoose');
var passportLocalMongoose = require("passport-local-mongoose");

var Schema = mongoose.Schema;

var userSchema = new Schema({
   username :  {type: String, required: true},
   password :  String,
   group    :  String,
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);