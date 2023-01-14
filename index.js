const express=require("express");
const app=express();
const Port=process.env.PORT||3000;
const route=require('./src/routes/route');
const connection=require('./src/connections/connect')


app.use(express.json());
//config
require("dotenv").config({
    path: "./.env",
  });


connection();


app.use('/',route)

app.listen(Port,()=>{
    console.log(`server is running on http://localhost${Port}`)
});