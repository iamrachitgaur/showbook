const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const collectionName = 'usersCollection';

// -- schema --
let schema = mongoose.Schema({
    name: {
            type:String,
            required:true,
            trim:true
        },
    email:{
            type:String,
            unique:true,
            required:true,
            lowercase:true,
            trim:true,
            validate(value) {
                if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
                }
            }
        },
    password:{
        type:String,
        trim:true,
        required:true,
        min:8
    },
    verified:{
        type:Boolean,
        default:false
    },
    tokens:[{
        token:{
            type:String
        },
        generatedAt:{
            type:Date
        }
    }],
},{
    timestamps:true
})

// -- methods --
schema.methods.toJSON = function(){
    const user = this
    const userObject = user.toObject()

    delete userObject.password

    return userObject
}

// -- generate token --
    schema.methods.generateAuthToken = async function(){
        const user = this
        const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET)
        if(user.tokens.length >= 4){
           delete user.tokens[0]
        }
        user.tokens = user.tokens.concat({token})
        return token
    }

// -- user by credentials --

schema.statics.findByCredentials = async function(email,password){
    const user = await model.findOne({email})
    if(!user){
        throw new Error('unable to signin')
    }
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch){
        throw new Error('unable to signin')
    }

    return user

}

// -- hash password --

    schema.pre('save',async function(next){
        const user = this

        if(user.isModified('password')){
            user.password = await bcrypt.hash(user.password,8)
        }
        next()
    })



    // -- set model --
    const model = mongoose.model(collectionName,schema)

    // --export model--
    module.exports = model;