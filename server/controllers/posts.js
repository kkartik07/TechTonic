const Blog=require('../models/Blog')
const User=require('../models/User')
const Comment=require('../models/Comment');

async function getAllPosts(req,res){
    const posts= await Blog.find({});
    res.json(posts);
}

async function getPost(req,res){
    // post is added to req in the middleware itself, so no fetch
    const post=req.post;
    res.send(post);
}

async function createPost(req,res){
    try{
        const post=req.body;
        const existingUser = await User.findOne({ username:post.author});
        const newBlog = new Blog({
            content: post.content,
            author: existingUser?._id, // Make sure this is an ObjectId
            title:post.title
        });
        await newBlog.save();
        res.json(newBlog)
    }catch(err){
        res.send(err)
    }
} 

async function deletePost(req,res){
    try{
        const id=req.params.postId;
        const post=await Blog.findOneAndDelete({_id:id});
        if(!post){
            res.send('Post doesnt exist, Try Again!');
        }
        res.json({message:'Post deleted by user successfully'});
    }catch(err){
        res.send(err)
    }
}

async function editPost(req,res){
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
}


async function createComment(req,res){
    try {
        const commentData = req.body;
        // Check if the author (user) exists
        const user = await User.findOne({ username: commentData.author });
        if (!user) {
        return res.status(404).send('User not found');
        }
        if(user._id!=req.userId){
            return res.status(404).send("User not matching (Token not matching)")
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
}



// Route handler for upvoting a post
async function upvotePost(req, res) {
    const postId = req.params.postId;

    try {
        // Find the post by ID
        const post = await Blog.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Increment the upvotes
        post.upvote += 1;

        // Save the updated post
        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Route handler for downvoting a post
async function downvotePost(req, res) {
    const postId = req.params.postId;

    try {
        // Find the post by ID
        const post = await Blog.findById(postId);

        if (!post) {
            return res.status(404).send('Post not found');
        }

        // Increment the downvotes
        post.downvote += 1;

        // Save the updated post
        await post.save();

        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports={getPost,getAllPosts,createPost,deletePost,editPost,createComment,upvotePost,downvotePost}