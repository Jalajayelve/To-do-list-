import express from 'express';
import dotenv from "dotenv";
import 'dotenv/config';
dotenv.config();
import notesRoutes from "./routes/notesRoutes.js";
import {connectDB}from "./config/db.js";
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors';


const app = express();
const port = 5001; 
console.log(process.env.MONGO_URI);

//const app = {rateLimiter};
//middleware
app.use(cors({
    origin: "http://localhost:5173", //frontend url
}));
app.use(express.json()); // this middleware will parse the json bodies:req.body
app.use(ratelimiter);

//app.use((req,res,next) =>{
    //console.log(`req method is ${req.method} & req url is ${req.url}`);
    //next();
//})
app.use("/api/notes", notesRoutes);
connectDB().then(() =>{
app.listen(port, () => {
    console.log(`server started on ${port}`);
});

});
  
//mongodb+srv://jalajayelve11_db_user:OnzcCegh4YTNiv6e@cluster0.ptkrljb.mongodb.net/?appName=Cluster0