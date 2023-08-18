const mongoose = require('mongoose');
const collectionName = 'areaCollection';

// -- schema --
let schema = mongoose.Schema({
    state: {
            type:String,
            required:true,
            trim:true
        },
        nearState: {
            type:Array,
            required:true
        },
        unionTerritory: {
            type:Array
        }
    
},{
    timestamps:true
})


    // -- set model --
    const model = mongoose.model(collectionName,schema)

    // --export model--
    module.exports = model;