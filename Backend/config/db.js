const mongoose=require("mongoose");

const connectDB=async(req,res)=>{
try {
await mongoose.connect(process.env.MONGO_URL);
// res.send({
//     message:`Database is connected`,
// });
console.log("Database is connected".bgGreen.white)    
} catch (error) {
    // res.send({
    //     message:`Internal Server Error ${error}`,
    //     success:false,
    //     description:`DataBase is Not Connected`,
    // });
    console.log(`Error Occured ${error}`)
}
}


module.exports=connectDB; 