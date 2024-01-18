const mongoose =require('mongoose')

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
    popularity: {
        type: Number,
        default: 0, // Initialize with zero popularity
    },
    upvote:{
        type:Number,
        default:0
    },
    downvote:{
        type:Number,
        default:0
    }
});
const Blog=mongoose.model('blog',blogSchema);

module.exports=Blog;