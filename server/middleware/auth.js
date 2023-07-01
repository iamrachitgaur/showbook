const jwt = require('jsonwebtoken');
const model = require('../models/user')

const auth = async (req,res,next)=>{

   try{

   const token = req.header('Authorization').replace('Bearer ','')
   // const token = req.cookies.Authorization.replace('Bearer ','');
   if (!token) {
      return res.status(403).send({error:'not Authenticate!!'});
    }
   const decode = jwt.verify(token,process.env.JWT_SECRET)
   const user = await model.findOne({'_id':decode._id,'tokens.token':token})

   if(!user){
      throw new Error()
   }

   req.user = user
   req.token = token

   next()
}
   catch(e){
      res.status(400).send({error:'Please Authenticate!!'})
   }


}

module.exports = auth