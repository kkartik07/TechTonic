const User=require('../models/User')

async function getUser(req,res){
    const id=req.params.id;
    try{
        const user=await User.findOne({_id:id});
        if(!user){
            res.send("User with this ID doesn't exist")
        }
        return res.json(user.username);
    }catch(error){
        res.status(404).send("Error fetching user! Try Again")
    }
}

module.exports={getUser};