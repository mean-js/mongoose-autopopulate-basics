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


router.get("/a/b", function(req, res, next){
   try{
       let Match = mongoose.model("Match");

       let id = "5a13ccc72323304c0400c8ac";
       let ujson = {"scheduleTime": new Date()};
       let mpromise = Match.findByIdAndUpdate(id, ujson).exec();
       mpromise.then(function(data){

           res.json(data);
       }).catch(function(err){
            res.json({});
       });
   }catch(err){
       let sres = {"err":err};
       res.json(sres);
   };
});


module.exports = router;