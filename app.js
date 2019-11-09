var express         = require("express"),
    passport        = require("passport"),
    mongoose        = require("./mongoose"),
    LocalStrategy   = require("passport-local"),
    LocalMongoose   = require("passport-local-mongoose"),
    bodyParser      = require("body-parser"),
    User            = require("./models/user"),
    home            = require("./routes/home"),
    apply           = require("./routes/apply"),
    dashboard       = require("./routes/dashboard"),
    hidden          = require("./hidden");

var app = express();
app.set("view engine", "ejs");
app.set("trust proxy", 1);
// Express will serve the files in the "public" directory
// Put css files there
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: hidden,
    cookie: { 
        secure: true,
        maxAge: 1000 * 60 * 60 * 24 * 7 // A week
        },
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
   console.log("Mongoose connected.") 
});

app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use("/", home);
app.use("/apply", apply);
app.use("/dashboard", dashboard);

app.listen(8080, function() {
    console.log("Server listening on port 8080");
})