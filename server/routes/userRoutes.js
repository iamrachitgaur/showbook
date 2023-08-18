const express = require('express');
const model = require('../models/user');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/check',(req,res)=>{
    res.send('check done!!')
})

router.post('/userSignup',async (req,res)=>{
        
    const options = Object.keys(req.body);
    const optionMain = ['name','email','password','verified'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }
    try{

        const user = await new model(req.body)
        const token = await user.generateAuthToken()
        await user.save()
        res.setHeader('Authorization',`Bearer ${token.token}`)
        res.status(201).send({user,token})
    }catch(e){
        if(e.code === 11000){
           return res.status(405).send({error:'email is already taken'})
        }
        res.status(405).send(e)
    }
})

router.post('/userSignin',async (req,res)=>{

    const options = Object.keys(req.body);
    const optionMain = ['name','email','password','verified'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }


    try{
        const user = await model.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        await user.save()
        res.setHeader('Authorization',`Bearer ${token}`)
        res.status(200).send({user,token})
    }catch(e){
        res.status(405).send(e)
    }

})

router.get('/user',auth,async(req,res)=>{
    try{
        res.status(200).send({user:req.user,token:req.token})
    }catch(e){
        res.status(405).send(e)
    }
    
})

router.patch('/user',auth,async (req,res)=>{
    const updates = Object.keys(req.body);
    const updatedAllowed = ['name','email','password','verified'];
    const isMatch = updates.every((update) => updatedAllowed.includes(update) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }


    try{
        updates.every((update)=> req.user[update] = req.body[update] )
        await req.user.save()
        res.status(201).send(req.user)

    }catch(e){
        if(e.code === 11000){
            return res.status(405).send({error:'email is already taken'})
         } 
        res.status(405).send(e)
    }

})

router.patch('/userLogout',auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.status(200).send()
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/userLogoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens =[]

        await req.user.save()
        res.status(200).send()
      }catch(e){
        res.status(405).send(e)
    }
})

router.delete('/user',auth,async(req,res)=>{
    try{
        req.user.remove()
        res.status(200).send()
    }
    catch(e){
        res.status(405).send(e)
    }
})

module.exports = router