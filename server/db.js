const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/bloggster')
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log(err))

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
},{timestamps:true});

const User=mongoose.model('user',userSchema);

const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment',
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,  
    },
});
const Blog=mongoose.model('blog',blogSchema);

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    postID: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Post',
          required:true
        },
      ],
    createdAt: {
        type: Date,
        default: Date.now,  
    },
});

const Comment=mongoose.model('comment',commentSchema);

module.exports={User,Blog,Comment}