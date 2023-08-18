const mongoose = require('mongoose');
const collectionName = 'eventCollection';

// -- schema --
let schema = mongoose.Schema({
    eventName: {
            type:String,
            required:true,
            trim:true
        },
    imageName:{
        type:String,
        required:true,
        trim:true
    },    
    state: {
            type:String,
            required:true,
            trim:true
        },
    address: {
            type:String,
            required:true,
            trim:true
        },
    eventDateTime:[{
        type:Date,
        required:true
    }],    
    eventCategory:{
        type:String,
        required:true
    },
    artists: [{
            type:String,
            required:true,
            trim:true
        }],
    organizer: {
        type:mongoose.Schema.ObjectId,
        ref:'usersCollection'
    },
    description: {
            type:String,
            required:true,
            trim:true
        },    
    
},{
    timestamps:true
})


    // -- set model --
    const model = mongoose.model(collectionName,schema)

    // --export model--
    module.exports = model;