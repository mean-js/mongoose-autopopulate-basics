let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();


router.get("/", function(req, res, next){
    res.json({"sql":"SELECT * FROM USER"});
});


module.exports = router;