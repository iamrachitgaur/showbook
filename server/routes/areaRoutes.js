const express = require('express');
const model = require('../models/area');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/location',auth,async (req,res)=>{
    try{
       var state = await new model(req.body)
       await state.save()
        res.status(200).send(state)
    }
    catch(e){
        res.status(405).send(e)
    }
})

router.get('/location',auth,async (req,res)=>{
    try{
        var state = await model.find()
        res.status(200).send(state)
    }
    catch(e){
        res.status(405).send(e)
    }
})

router.get('/location/:state',auth,async (req,res)=>{
    try{
       var state = await model.findOne({state:req.params.state})
        res.status(200).send(state)
    }
    catch(e){
        res.status(405).send(e)
    }
})

module.exports = router