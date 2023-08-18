const express = require('express');
const model = require('../models/booking');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/booking',auth,async (req,res)=>{
   
    const options = Object.keys(req.body);
    const optionMain = ['userId','eventId','seats'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }


    try{

       const event = await new model(req.body)
       await event.save()
       res.status(201).send(event) 
    }
    catch(e){
        res.status(405).send(e)
    }
})

router.get('/booking/:id',auth,async (req,res)=>{
    try{
        const event = await model.find({eventId:req.params.id})
        res.status(200).send(event)
    }
    catch(e){
        res.status(405).send(e)
    }
})

module.exports = router