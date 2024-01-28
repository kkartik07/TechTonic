var jwt = require('jsonwebtoken');
const User=require('../models/User');
const Blog=require('../models/Blog');
require('dotenv').config();

const SECRET=process.env.SECRET;

async function createAccount(req, res) {
    try{
        const userBody = req.body;
        const user = new User(userBody);
        await user.save();
        const token = jwt.sign({username:user.username,userId: user._id}, SECRET);
        res.json({ token ,_id:user._id});
    }
    catch(err){
        console.log(err)
    }
}

async function login(req, res) {
    const userBody = req.body;
    try {
        const user = await User.findOne({ username: userBody.username });
    
        if (!user) {
            res.status(401).send('User not found or incorrect username/password');
            return;
        }
        if(user.password !== userBody.password){
            res.status(401).send('Incorrect username/password');
            return;
        }
    
        const token = jwt.sign({ username: user.username, userId: user._id }, SECRET);
        res.json({ token, _id: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
    
}

async function subscribe(req,res){
    const author=req.params.id;
    const id=req.user.userId;
    const user = await User.findOne({_id:author});
    if(!user){
        res.status(401).send("User not found!");
        return;
    }
    const subscriber = await User.findOne({_id:id});
    if(!subscriber){
        res.status(401).send("You are not found!");
        return;
    }
    if(subscriber.subscriptions.includes(author)){res.status(404).send("You are already a subscriber");return;}
    user.subscribers+=1;
    subscriber.subscriptions.push(author);
    const response=await User.findByIdAndUpdate({_id:author},{...user},{new:false})
    const response2=await User.findByIdAndUpdate({_id:id},{...subscriber},{new:false})
    if(!response || !response2){
        res.status(404).send('Failed to subscribe');
    }
    res.send("Subscribed successfully")
}

async function userAnalytics(req,res){
    try{
        const user=req.user;
        if(!user){
            res.status(401).send('User not found!')
        }
        const posts=await Blog.find({author:user.userId});
        const euser=await User.findOne({_id:user.userId});
        let subscribers=euser.subscribers;
        let subscribedTo=euser.subscriptions.length;
        let totalViews=0;
        let totalDownvotes=0;
        let totalUpvotes=0;
        let totalComments=0;
        posts.map(post=>totalViews+=post.popularity);
        posts.map(post=>totalUpvotes+=post.upvote);
        posts.map(post=>totalDownvotes+=post.downvote);
        posts.map(post=>totalComments+=post.comments.length);
        
        const data={
            posts,
            details:{
                totalViews,
                totalUpvotes,
                totalDownvotes,
                totalComments,
                subscribedTo,
                subscribers
            }
        }
        res.json(data)
    }catch(err){
        res.status(401).send('Error! Try again')
    }
}
    module.exports={createAccount, login,userAnalytics,subscribe}