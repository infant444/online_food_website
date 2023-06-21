import { Router } from "express";

import asynceHandler from 'express-async-handler'
import { FoodModel } from "../models/food.model";
import { WishListModel } from "../models/wish.model";
import auth from "../middleware/auth.mid";
import { WishModel } from "../models/wishlist.model";

const router=Router();

router.use(auth);

router.get("/",asynceHandler(
    async(req:any,res)=>{
        const wish=await WishModel.find({user:req.user.id});
        if(wish){
            res.send(wish);
            return;
        }
        res.send(wish);   
    }
))

export default router;