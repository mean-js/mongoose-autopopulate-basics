let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();


router.get("/:id", function(req, res, next){
    try{
        let mpromise;
        let Match = mongoose.model("Match");
        mpromise = Match.find().exec();

        mpromise.then(function(data){

            let sres = {"data":data};
            res.json(sres);
        }).catch(function(err){
            let sres = {"err":err};
            res.json(sres);
        });

    }catch(err){
        let sres = {"err":err};
        res.json(sres);
    }
});


module.exports = router;