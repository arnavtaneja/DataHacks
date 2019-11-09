 var mongoose = require('mongoose');

var infoSchema = new mongoose.Schema({
        name: String,
        email: String
});
    
var userInfo = mongoose.model('userInfo', infoSchema);
    
module.exports = mongoose.model('info', infoSchema);