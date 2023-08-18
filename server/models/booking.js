const mongoose = require('mongoose');
const collectionName = 'bookingCollection';

// -- schema --
let schema = mongoose.Schema({

    userId:{type:mongoose.Schema.ObjectId,ref:'usersCollection'},
    eventId:{type:mongoose.Schema.ObjectId,ref:'eventCollection'},
    seats:{
        vip:{
            prize:{type:Number,required:true},
            rows:[{
                seat:[{row:{type:String},seatType:{type:String,default:'vip'},seatNumber:{type:Number},seatStatus:{type:String,default:'hide'},userBookId:{type:mongoose.Schema.ObjectId,ref:'usersCollection'}}]
            }]       
        },
        platinum:{
            prize:{type:Number,required:true},
            rows:[{
                seat:[{row:{type:String},seatType:{type:String,default:'platinum'},seatNumber:{type:Number},seatStatus:{type:String,default:'hide'},userBookId:{type:mongoose.Schema.ObjectId,ref:'usersCollection'}}]
            }]
        },
        gold:{
            prize:{type:Number,required:true},
            rows:[{
                seat:[{row:{type:String},seatType:{type:String,default:'gold'},seatNumber:{type:Number},seatStatus:{type:String,default:'hide'},userBookId:{type:mongoose.Schema.ObjectId,ref:'usersCollection'}}]
            }]
        },
        silver:{
            prize:{type:Number,required:true},
            rows:[{
                seat:[{row:{type:String},seatType:{type:String,default:'silver'},seatNumber:{type:Number},seatStatus:{type:String,default:'hide'},userBookId:{type:mongoose.Schema.ObjectId,ref:'usersCollection'}}]
            }]
        }
    },  

},{
    timestamps:true
})

    // -- set model --
    const model = mongoose.model(collectionName,schema)

    // --export model--
    module.exports = model;