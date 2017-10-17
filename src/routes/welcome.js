let express = require("express");
let router = express.Router();

let configs = require("../configs");


router.get("/", function(req, res, next){
    res.json({"title":"Hello"});
});


module.exports = router;