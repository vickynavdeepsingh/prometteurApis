const mongoose= require('mongoose');
mongoose.set('strictQuery', false);

const connectDatabase = () =>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((data) =>{
        console.log(`mongodb is connected with server`);
    }).catch((err)=>{
        console.log(err.message)
    })
    }
    
    
    module.exports= connectDatabase;