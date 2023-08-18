const express = require('express');
const model = require('../models/event');
const auth = require('../middleware/auth');
const multer = require('multer');
const sharp = require('sharp');
const router = express.Router();


const storage = multer.memoryStorage()

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            callback(new Error('please select an image'))
        }
        callback(undefined, true)
    },
    storage:storage
})


router.post('/event',auth,upload.single('image'),async (req,res)=>{
   
    const options = Object.keys(req.body);
    const optionMain = ['eventName','image','state','address','eventDateTime','eventCategory','artists','organizer','seats','description'];
    const isMatch = options.every((option) => optionMain.includes(option) )


    if(!isMatch){
       return res.status(400).send({error:'You Provide Invalid Input'})
    }


    try{
        const path = './src/assets/images/'
        const eventName = req.body.eventName
        const imageName = eventName.trim().replace(/ /g,'_').toLowerCase()+Date.now();
        req.body.imageName = imageName
        console.log(req.body)
        const event = await new model(req.body)
       await sharp(req.file.buffer).resize(400,400).toFile(path+imageName+'.png')
       await event.save()
       res.status(201).send(event) 
    }
    catch(e){
        res.status(405).send(e)
    }
})

router.get('/event/:state',auth,async (req,res)=>{
    try{
        const event = await model.find({state:req.params.state,eventCategory:req.query.eventCategory})
        res.status(200).send(event)
    }
    catch(e){
        res.status(405).send(e)
    }
})

module.exports = router