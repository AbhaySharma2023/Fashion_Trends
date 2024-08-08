const express = require("express");
const colors = require("colors");
const dotenv= require("dotenv").config();
const morgan = require('morgan');
const rootroute=require("./routes/rootroute");
const connectDB=require("./config/db");
const productroute=require("./routes/productroute")

const PORT = process.env.PORT || 3000;
const app=express();

connectDB();


app.use("/",rootroute)
app.use("/fashiontrends",productroute)

app.listen(PORT,()=>{
    console.log(`Server is running on port number ${PORT}`.bgBlue.white);
})
