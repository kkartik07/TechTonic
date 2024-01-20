const express=require('express')
const app=express();
const cors=require('cors');
const connectDB = require('./connection.js');
require('dotenv').config();


const {getAllPosts,getPost,createPost,deletePost,editPost,createComment,upvotePost,downvotePost}=require('./controllers/posts.js');
const {login,createAccount}=require('./controllers/user.js')
const {getUser, getComments}=require('./controllers/api.js')
const {auth,isSignedIn,incrementPopularity}=require('./middlewares/util.js')

app.use(cors());
app.use(express.json());
const PORT=process.env.PORT;
const url=process.env.URL;

connectDB(url);


app.get('/',(req,res)=>res.send('Hello'));

app.post('/signup',createAccount)
app.post('/signin',login)

app.get('/posts',getAllPosts)
app.post('/posts',auth,createPost)
app.delete('/posts/:postId',auth,deletePost);
app.put('/posts/:postId',auth,editPost);
app.get('/posts/:postId',incrementPopularity,getPost);
app.post('/posts/:postId/upvote', upvotePost);
app.post('/posts/:postId/downvote', downvotePost);
app.post('/comment',isSignedIn,createComment);

app.get('/api/user/:id',getUser);
app.get('/api/comments/:id',getComments);

app.listen(PORT,(req,res)=>{
  console.log(`Server running on localhost:${PORT}`);
})

