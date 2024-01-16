const express=require('express')
const app=express();
const cors=require('cors');
const {Blog,User,Comment}=require('./db')
app.use(cors());
app.use(express.json());

const PORT=3000;

app.get('/',(req,res)=>res.send('Hello'));

app.post('/signup',async(req,res)=>{
    const user=req.body;
    const newUser = new User(user);
    await newUser.save();
    res.send('User added successfully')
})
app.post('/signin',async(req,res)=>{
    const user=req.body;
    const userFound=await User.findOne({username:user.username});
    if (!userFound || userFound.length === 0 || userFound.password !== user.password) {
        res.send('User not found or incorrect username/password');
    } else {
        res.send('User signed in');
    }
})
app.get('/posts',async (req,res)=>{
    const posts= await Blog.find({});
    res.json(posts);
})

app.post('/posts',async(req,res)=>{
    const post=req.body;
    const existingUser = await User.findOne({ username:post.author});
    const newBlog = new Blog({
        content: post.content,
        author: existingUser?._id, // Make sure this is an ObjectId
        title:post.title
      });
    await newBlog.save();
    res.json(newBlog)
})

app.delete('/posts/:id',async(req,res)=>{
    const id=req.params.id;
    const post=await Blog.findOneAndDelete({_id:id});
    if(!post){
        res.send('Post not deleted, Try Again!');
    }
    res.json({message:'Post deleted by user successfully'});
});

app.put('/posts/:postId', async (req, res) => {
    try {
      const postId = req.params.postId;
  
      // Find the existing blog post
      const existingPost = await Blog.findById(postId);
  
      if (!existingPost) {
        return res.status(404).send('Blog post not found');
      }
  
      // Update the existing blog post with new data using the spread operator
      const updatedPost=await Blog.findByIdAndUpdate({_id:postId},{...req.body},{ new: true });
  
      // Save the updated blog post
      await updatedPost.save();
      
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  
app.post('/comment', async (req, res) => {
    try {
      const commentData = req.body;
  
      // Check if the author (user) exists
      const user = await User.findOne({ username: commentData.author });
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      // Create a new comment
      const newComment = new Comment({
        content: commentData.content,
        author: user._id,
        postID: commentData.postID,
      });
  
      // Save the new comment to the Comment collection
      await newComment.save();
  
      // Update the comments array in the corresponding blog post
      const blogPost = await Blog.findById(commentData.postID);
  
      if (!blogPost) {
        return res.status(404).send('Blog post not found');
      }
  
      blogPost.comments.push(newComment._id);
      await blogPost.save();
  
      res.send('Commented successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
    
app.listen(PORT,(req,res)=>{
    console.log(`Server running on localhost:${PORT}`);
})