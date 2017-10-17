let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');
let Schema = mongoose.Schema;

let Promise = require('bluebird');
mongoose.Promise = Promise;


let autoPopulateTopFollower = function(next) {
    this.populate('topFollower', 'name');
    next();
};

let userSchema = new Schema({
    "name"	        :	{type: String},
    "description"	:	{type: String},
    "email" 	    :	{type: String},

    "mobile"    	:	{type: String},
    "macid"	        :	{type: String},
    "fcmtoken"      :	{type: String},

    /* property to test populate */
    "topFollower"   : {type: Schema.Types.ObjectId, ref: "User", autopopulate:{select:'name email'} },
    "followerList"  : [{type: Schema.Types.ObjectId, ref: "User"}],

    /*"lastFollower" : {
        "ts" : Date,
        "detail" : {type: Schema.Types.ObjectId, ref: "User"},
    },

    "lastFollowerList" : [{
        "ts" : Date,
        "detail" : {type: Schema.Types.ObjectId, ref: "User"},
    }]*/
}, { timestamps:true});
userSchema.plugin(autopopulate);

mongoose.model("User", userSchema, "User");
