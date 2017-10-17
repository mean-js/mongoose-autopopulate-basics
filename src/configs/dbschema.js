let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    "name"	        :	{type: String},
    "description"	:	{type: String},
    "email" 	    :	{type: String},

    "mobile"    	:	{type: String},
    "macid"	        :	{type: String, index: true},
    "fcmtoken"      :	{type: String, index: true}
}, { collection: "user", timestamps:true});
mongoose.model("User", userSchema);
