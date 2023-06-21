import { Router } from 'express';
import asynceHandler from 'express-async-handler';
import {Cart, CartModel} from '../models/cart.model';
import auth from '../middleware/auth.mid';


const router=Router();

router.use(auth);


router.post("/cartlist",asynceHandler(
    async(req:any,res)=>{
        const requestCart=req.body;
        const user=req.user.id;
        console.log("hello");
       const c= await CartModel.deleteOne({user:user});
        const newCart=new CartModel({...requestCart,user:user});
        await newCart.save();
        res.send(newCart);
    }
))
router.get('/',asynceHandler(
    async (req:any,res)=>{
        const cart=await CartModel.findOne({user:req.user.id});
        console.log(cart);
        res.send(cart);
    }
))


export default router;
