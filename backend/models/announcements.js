const mongoose = require("mongoose");
const announcementsSchema = new mongoose.Schema({
    title : {
        type:String,
        required:true,
    },
    description : {
        type:String,
        required:true,
    },
    importance : {
        type:String,
        required:true,
    },
    date : {
        type: Date, 
        default: Date.now
    },
    visibleTo : {
        type:String,
        required:true,
    },
});
const Announcements = mongoose.model('Announcements',announcementsSchema);
module.exports = Announcements ;
