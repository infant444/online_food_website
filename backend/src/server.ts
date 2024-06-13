import dorenv from 'dotenv';
dorenv.config();

import experss from 'express';
import cors from 'cors';
import { sampleUser } from "./data";
import jwt from 'jsonwebtoken';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import wishlistRouter from './routers/wishlist.router'
import { dbconnect } from './configs/database.config';
import asynceHandler from 'express-async-handler';
import { UserModel } from './models/user.model';
import cartRouter from './routers/cart.router';
import path from 'path';
dbconnect();


const app=experss();
app.use(experss.json());
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));




app.use('/api/foods',foodRouter);
app.use('/api/user',userRouter);
app.use('/api/order',orderRouter);
app.use('/api/wish',wishlistRouter);
app.use('/api/cart',cartRouter);

app.use(experss.static('public'))
// app.get("*",(req,res)=>{
//     res.sendFile(path.join(__dirname,'public','index.html'))
// })
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log("Websit serve on http://localhost:"+port);
    
})