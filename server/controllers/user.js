var jwt = require('jsonwebtoken');
const User=require('../models/User');
const Blog=require('../models/Blog');
require('dotenv').config();

const SECRET=process.env.SECRET;

async function createAccount(req, res) {
    const userBody = req.body;
    const user = new User(userBody);
    await user.save();
    const token = jwt.sign({username:user.username,userId: user._id}, SECRET);
    res.json({ token });
}

async function login(req, res) {
    const userBody = req.body;
    const user = await User.findOne({ username: userBody.username });

    if (!user || user.length === 0 || user.password !== userBody.password) {
        res.send('User not found or incorrect username/password');
    } else {

    const token = jwt.sign({ username:user.username,userId: user._id }, SECRET);
        res.json({ token });
    }
}


async function userAnalytics(req,res){
    try{
        const user=req.user;
        if(!user){
            res.status(401).send('User not found!')
        }
        const posts=await Blog.find({author:user.userId})
        let totalViews=0;
        let totalDownvotes=0;
        let totalUpvotes=0;
        let totalComments=0;
        posts.map(post=>totalViews+=post.popularity);
        posts.map(post=>totalUpvotes+=post.upvote);
        posts.map(post=>totalDownvotes+=post.downvote);
        posts.map(post=>totalComments+=post.comments.length);
        
        const details={
            posts,
            totalViews,
            totalUpvotes,
            totalDownvotes,
            totalComments
        }
        res.json(details)
    }catch(err){
        res.status(401).send('Error! Try again')
    }
}
    module.exports={createAccount, login,userAnalytics}