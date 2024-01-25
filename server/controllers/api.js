const User=require('../models/User')
const Comment=require('../models/Comment');

async function getUser(req,res){
    const id=req.params.id;
    try{
        const user=await User.findOne({_id:id});
        if(!user){
            res.send("User with this ID doesn't exist")
        }
        
        return res.json(user);
    }catch(error){
        res.status(404).send("Error fetching user! Try Again")
    }
}


async function getComments(req,res){
    const id=req.params.id;
    try{
        const comment=await Comment.findById({_id:id});
        if(!comment)res.json(undefined);
        else res.json(comment);
    }catch(err){
        res.status(404).send("Error Fetching comment");
    }
}
module.exports={getUser,getComments};