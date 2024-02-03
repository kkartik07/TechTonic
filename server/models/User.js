const mongoose=require('mongoose');

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
    },
    subscriptions:{
        type:Array,
        default:[]
    },
    subscribers:{
        type:Number,
        default:0
    },
    archives:{
        type:Array,
        default:[]
    }
},{timestamps:true});

const User=mongoose.model('user',userSchema);

module.exports=User; 