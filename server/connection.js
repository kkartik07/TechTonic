const mongoose=require('mongoose')

function connectDB(url){
    mongoose.connect(url)
    .then(()=>console.log('MongoDB connected'))
    .catch(err=>console.log(err))
}

module.exports=connectDB