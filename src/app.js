var mongoose = require('mongoose');
let express = require("express");
var multer = require('multer');
var bodyParser = require('body-parser');

let configs = require("./configs");
let routes = require("./routes");

mongoose.connect('mongodb://localhost/test', {"useMongoClient": true});
mongoose.Promise = global.Promise;

let app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true }));
app.use(routes);

app.listen(4000, function(){
    console.log("Server Started");
});