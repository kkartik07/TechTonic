require('dotenv').config();
const jwt=require('jsonwebtoken')
const Blog =require('../models/Blog')
const SECRET=process.env.SECRET;


// to check if a user authenticated to the further API call
const auth = async(req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }
  
    try {
        const decoded = jwt.verify(token, SECRET);
        // Assuming decoded.user contains the user information from the token
        if (req.method === 'DELETE' || req.method==='PUT') {
            // Check if the user from the token matches the author of the post
            const postId = req.params.postId; // Adjust as per your route structure
            const post = await Blog.findById(postId);
            if (post && post.author.equals(decoded.userId)) {
                req.username = decoded.username;
                next();
            } else {
                res.status(403).send('User not authorized to delete this post.');
            }
        } else {
            // For other HTTP methods, continue with the original logic
            if (req.body.author === decoded.username) {
                req.username = decoded.username;
                next();
            } else {
                res.status(403).send('User not matching');
            }
        }
    } catch (error) {
        res.status(403).send('Invalid token');
    }
  };
  
  // to check if a user is signed in
  const isSignedIn = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    
    if (!token) {
      return res.status(401).send('Access denied. No token provided.');
    }
    
    try {
      const decoded = jwt.verify(token, SECRET);
      if(!decoded)res.send('Invalid Token');
      req.userId=decoded.userId;
      next();
    } catch (error) {
      res.status(403).send('Please Login to make a comment');
    }
  };
  


const incrementPopularity=async(req,res,next)=>{
    try{const postId=req.params.postId;
      const post=await Blog.findOne({_id:postId});
      if(!post){
        res.status(404).send("Post not found! Try Again");
      }
      post.popularity = post.popularity + 1;
      await post.save();  
      req.post = post;
      next();
    }
    catch(err){
      res.status(500).send("Internal Server Error");
    }
  
  }
  

  module.exports={auth,isSignedIn,incrementPopularity}