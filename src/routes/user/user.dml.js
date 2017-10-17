let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();

router.post("/", function(req, res, next){
    let reqjson = req.body;

    let User = mongoose.model("User");
    let pojo = new User(reqjson);
    let mpromise = pojo.save(reqjson);
    mpromise.then(function(data){

        let sres = {"operation" : true, "data":data};
        res.json(data);
    }).catch(function(err){
        res.json({"operation" : false, "err":err});
    });
});

module.exports = router;