var mongoose = require('mongoose');
let express = require("express");

let configs = require("./configs");
let routes = require("./routes");

mongoose.connect('mongodb://localhost/test', {"useMongoClient": true});
mongoose.Promise = global.Promise;

let app = express();
app.use(routes);


app.listen(4000, function(){
    console.log("Server Started");
});