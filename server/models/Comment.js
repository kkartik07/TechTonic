const mongoose=require('mongoose')

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

module.exports=Comment;