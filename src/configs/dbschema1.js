let mongoose = require('mongoose');
let autopopulate = require('mongoose-autopopulate');
let Schema = mongoose.Schema;

let Promise = require('bluebird');
mongoose.Promise = Promise;

let config = {
    "GuestUser" : {name : "GuestUser", collection : "guestuser"},
    "User" :{name: "User", collection : "user", select:'_id id fullname name imageIcon username mobile email gender dob userType height weight currentLocation createdBy updatedBy updatedAt createdAt __v'},
    "UserInvitationByUser" : {name: "UserInvitationByUser", collection:"user_invitation_byuser"},
    "UserTeamSub" : {name: "UserTeamSub", collection : "userteamsub"},
    "UserNotification" : {name : "UserNotification", collection : "userNotification"},
    "Promo" : {name : "Promo", collection : "promo"},

    "InviteUser" : {name : "InviteUser", collection : "inviteuser"},
    "SportsRole" : {name : "SportsRole", collection : "sportsrole"},

    "Sport" :{name: "Sport", collection : "sport"},
    "SportFormat" : {name: "SportFormat", collection : "sportFormat"},
    "SportFormatRule" : {name: "SportFormatRule", collection : "sportFormatRule"},
    "SportActionMaster" : {name : "SportActionMaster", collection : "sportActionMaster"},

    "Team" : {name: "Team", collection : "team"},
    "UserTeam" : {name: "UserTeam", collection : "userteam"},
    "TeamSubChallenge" : {name: "TeamSubChallenge", collection : "teamsubchallenge"},
    "TeamTournaments" : {name: "TeamTournaments", collection : "teamTournaments"},

    "Challenge" : {name: "Challenge", collection : "challenge"},
    "Tournament" : {name: "Tournament", collection : "tournament"},
    "TournamentGroup" : {name: "TournamentGroup", collection : "tournamentGroup"},
    "Match" : {name : "Match", collection : "match"},

    "ResCourtSubSchema" : {name: "ResCourtSubSchema", collection:"resCourtSubSchema"},
    "Resource" : {name: "Resource", collection: "resource", "court":"court"},

    "HomeNews" : {name: "HomeNews", collection: "homenews"},

    "CricketScore" : {name : "CricketScore", collection : "scoreCricket"},
    "CricketScoreDerived" : {name : "CricketScoreDerived", collection : "scoreCricketDerived"},
    "CricketStats" : {name : "CricketStats", collection : "statsCricket"},

    "FootballScore" : {name : "FootballScore", collection : "scoreFootball"},
    "FootballStats" : {name : "FootballStats", collection : "statsFootball"},

    "HockeyScore" : {name : "HockeyScore", collection : "scoreHockey"},
    "HockeyStats" : {name : "HockeyStats", collection : "statsHockey"},

    "BadmintonScore" : {name : "BadmintonScore", collection : "scoreBadminton"},
    "BadmintonStats" : {name : "BadmintonStats", collection : "statsBadminton"},

    "VolleyballScore" : {name : "VolleyballScore", collection : "scoreVolleyball"},
    "VolleyballStats" : {name : "VolleyballStats", collection : "statsVolleyball"},

    "TableTennisScore" : {name : "TableTennisScore", collection : "scoreTableTennis"},
    "TableTennisStats" : {name : "TableTennisStats", collection : "statsTableTennis"},

    "LawnTennisScore" : {name : "LawnTennisScore", collection : "scoreLawnTennis"},
    "LawnTennisStats" : {name : "LawnTennisStats", collection : "statsLawnTennis"},

    "BasketballScore" : {name : "BasketballScore", collection : "scoreBasketball"},
    "BasketballStats" : {name : "BasketballStats", collection : "statsBasketball"},

    "KabaddiScore" : {name : "KabaddiScore", collection : "scoreKabaddi"},
    "KabaddiStats" : {name : "KabaddiStats", collection : "statsKabaddi"},

    "Feedback" : {name : "Feedback", collection : "feedback"},
    "AdBanner" : {name : "AdBanner", collection : "adbanner"},
    "GCS" : {name : "GCS", collection : "gcs"},


    "RssFeedMaster" : {name : "RssFeedMaster", collection : "rssFeedMaster"},
    "RssFeeds" : {name : "RssFeeds", collection : "rssFeeds"},

    "ApiKeyMaster" : {name : "ApiKeyMaster", collection : "apiKeyMaster"},
    "ApiKeyUser" : {name : "ApiKeyUser", collection : "apiKeyUser"},
};



/**########### Start User Schema ################**/
var userSchema = new Schema({
    name		:	String,
    firstname	: 	String,
    lastname	:	String,
    middlename	:	String,
    fullname	:	String,
    gender		:	{type: String, enum: ['M', 'F'],  uppercase: true},
    dob			:	Date,
    height		:	String,
    weight		: 	String,

    //username	:	String, // email/mobile could be username
    password	:	String,

    country 	: String,
    countryCode : String,
    mobile 		:	{type: String},
    email		:	{type: String},

    socialId	: 	String, // ID given by social auth

    gallery		: 	[{type: Schema.Types.ObjectId}],
    imageIcon	:	{type: Schema.Types.ObjectId},


    status		:	{type: String, enum: ['INVITED', 'DUPLICATE', 'REGISTERED', 'DELETED'], 'default': 'INVITED', index: true},
    active		: 	{type: Boolean, 'default': true },

    userTeamInfo : Schema.Types.Mixed,
    nationality	 : {type: String},

    singleTeam : String,

    dashboardAccess: Boolean,
}, { collection: config.User.collection, timestamps:true});
userSchema.plugin(autopopulate);
mongoose.model(config.User.name, userSchema);
/**########### End User Schema ################**/


/**########### Start Team Schema ################**/
var teamSchema = new Schema ({
    name		:	String,
    description	:	String,
    apartmentName:  String,

    size		:	Number,

    gallery		: 	[{type: Schema.Types.ObjectId}],
    imageIcon	:	{type: Schema.Types.ObjectId},

    captain 	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
    invUserList : 	[{type:Schema.Types.ObjectId, ref: config.UserTeam.name}],

    address		: 	{
        state	:	{type: String},
        city	:	{type: String},
        street	:	{type: String},
        building:	{type: String},
        pincode	:	{type: String}
    },

    system_gen_flag	: {type: Boolean},
    single_team	: {type:Boolean},

    uiNumberOfSetWon : Number,
    uiNoOfGoal		 : Number,
}, {collection:	config.Team.collection, timestamps:true});
teamSchema.plugin(autopopulate);
mongoose.model(config.Team.name, teamSchema);


/**########### Start ChallengeInvitation cum Match Schema ################**/
var matchSchema = new Schema ({
    firstTeam			:	{type: Schema.Types.ObjectId, ref: config.Team.name,  autopopulate:{select:'_id name captain'}},

    secondTeam			:	{type: Schema.Types.ObjectId, ref: config.Team.name, autopopulate:{select:'_id name captain' }},
    invStatusUpdateDate	:	Date,

    scheduleTime		:	Date,

    reschedule :{
        scheduleTime : Date,
        resourceId	:	{type: Schema.Types.ObjectId, ref: config.Resource.name},
        byuser 	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
        utime	: Date,
    },

    firstTeamInfo	:{
        teamId		: {type: Schema.Types.ObjectId, ref: config.Team.name, autopopulate:{select:'_id name'}},

        playingList : [{
            userid	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
            jerseyNumber : {type: String},
            sportRoles : [{type: Schema.Types.ObjectId, ref: config.SportsRole.name, index: true}],
        }],
        playingListOffField : [{
            userid	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
            jerseyNumber : {type: String},
            sportRoles : [{type: Schema.Types.ObjectId, ref: config.SportsRole.name, index: true}],
        }],

        captain 	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
        keeper		: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
        coach 		: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
        runkeeper	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},
        freezed 	: {type:Boolean, 'default': false},
    },

    // Match Specific : Team and Playing Player details
    matchInitiated		: {type:Boolean, 'default': false},
    matchInitiatedBy	: {type: Schema.Types.ObjectId, ref: config.User.name, autopopulate:{select:'_id name'}},

    matchStartTime		: {type: Date},


}, {collection:	"match", timestamps:true});
matchSchema.plugin(autopopulate);
mongoose.model(config.Match.name, matchSchema);
/**########### End ChallengeInvitation Schema ################**/
