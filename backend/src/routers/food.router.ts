import { Router } from "express";
import { sampleTag, samplefood } from "../data";
import asynceHandler from 'express-async-handler';
import { Food, FoodModel } from "../models/food.model";
import { BAD_STATUS } from "../constent/status";
import { WishListModel } from "../models/wish.model";
import { WishModel } from "../models/wishlist.model";
import auth from "../middleware/auth.mid";
import { UserModel } from "../models/user.model";


const router = Router();


router.use(auth);

router.get("/seed", asynceHandler(
    async (req, res) => {
        const foodCount = await FoodModel.countDocuments();
        if (foodCount > 0) {
            res.send("Seed is already done");
            return;
        }
        await FoodModel.create(samplefood);
        res.send("Seed is Done");
    }))


// router.get("/",asynceHandler(
//     async (req,res)=>{
//         const food=await FoodModel
//         res.send(food);
//     }

// ))
router.get("/", asynceHandler(
    async (req:any, res) => {
        const food = await FoodModel.find();
         const wish=await WishListModel.find({user:req.user.id});
        res.send(foodconnectwithfav(food,wish));
    }
))
const foodconnectwithfav=(food:any[],wish:any[])=>{
     if(wish){
            for(let i=0;i<food.length;i++){
                for(let j=0;j<wish.length;j++)
                {
                    if(food[i].id === wish[j].food.toString()){
                        food[i].favirote=wish[j].favirote;

                    }
                }
            }
            
        }
        return food;
        
}
router.get("/search/:search", asynceHandler(
    async (req:any, res) => {
        const searchRegex = new RegExp(req.params.search, 'i');
        const food = await FoodModel.find({ name: { $regex: searchRegex } });
        const wish=await WishListModel.find({user:req.user.id});
        res.send(foodconnectwithfav(food,wish));
    }

))
router.get("/tag", asynceHandler(
    async (req, res) => {
        const tag = await FoodModel.aggregate([
            {
                $unwind: '$tag'
            },
            {
                $group: {
                    _id: '$tag',
                    count: { $sum: 1 }
                }
            },
            {
                $project:
                {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });
        const all = {
            name: 'All',
            count: await FoodModel.countDocuments()
        }
        tag.unshift(all);
        res.send(tag);
    }
))
router.get("/tag/:Tagname", asynceHandler(
    async (req:any, res) => {
        const food = await FoodModel.find({ tag: req.params.Tagname })
        const wish=await WishListModel.find({user:req.user.id});
        res.send(foodconnectwithfav(food,wish));
    }

))

router.get("/:foodid", asynceHandler(
    async (req:any, res) => {
        const food = await FoodModel.findById(req.params.foodid);
        const wish=await WishListModel.findOne({user:req.user.id,food:req.params.foodid});
        res.send(foodconnectwithfavone(food,wish));
    }

))
const foodconnectwithfavone=(food:any,wish:any)=>{
    if(wish){
        food.favirote=wish.favirote;
           
       }
       return food;
       
}

router.delete("/deletefood/:foodid", asynceHandler(
    async (req, res) => {
        console.log("s");
        const x = await FoodModel.findByIdAndDelete(req.params.foodid)
        await WishListModel.deleteMany({food:req.params.foodid});
        var wish=await WishModel.deleteMany({food:req.params.foodid});
        console.log(x);
        res.send(x);
    }
))

router.put("/update/name/:foodid",asynceHandler(
    async (req,res)=>{
        console.log("update");
        var{name}=req.body;
        const x=await FoodModel.findByIdAndUpdate(req.params.foodid,{name:name});
        console.log(x);
        res.send(x);
    }
))

router.put("/update/image/:foodid",asynceHandler(
    async (req,res)=>{
        console.log("update");
        var{imageurl}=req.body;
        const x=await FoodModel.findByIdAndUpdate(req.params.foodid,{imageurl:imageurl});
        console.log(x);
        res.send(x);
    }
))
router.put("/update/tag/:foodid",asynceHandler(
    async (req,res)=>{
        console.log("update");
        var{tag}=req.body;
        const x=await FoodModel.findByIdAndUpdate(req.params.foodid,{tag:tag});
        console.log(x);
        res.send(x);
    }
))
router.put("/update/rating/:foodid",asynceHandler(
    async (req,res)=>{
        console.log("update");
        var{rating}=req.body;
        const x=await FoodModel.findByIdAndUpdate(req.params.foodid,{rating:rating});
        console.log(x);
        res.send(x);
    }
))

router.put("/update/price/:foodid",asynceHandler(
    async (req,res)=>{
        console.log("update");
        var{price}=req.body;
        const x=await FoodModel.findByIdAndUpdate(req.params.foodid,{price:price});
        console.log(x);
        res.send(x);
    }
))

router.put("/update/orgin/:foodid",asynceHandler(
    async (req,res)=>{
        console.log("update");
        var{name}=req.body;
        const x=await FoodModel.findByIdAndUpdate(req.params.foodid,{name:name});
        console.log(x);
        res.send(x);
    }
))

router.put("/update/favirote/:foodid",asynceHandler(
    async (req:any,res)=>{
        console.log("update");
        const filter={
            $and:[
                {food:req.params.foodid,
                    user:req.user.id}

            ]
        }
        var{favarite}=req.body;
        console.log(favarite);
        const x=await WishListModel.findOneAndUpdate(filter,{favirote:favarite});
        const food=await FoodModel.findById(req.params.foodid);
        if(favarite)
        {
            var newWish=new WishModel({name:food?.name,user:req.user.id,imageurl:food?.imageurl,food:food?.id});
            console.log(newWish);
            await newWish.save();
        }
        else{
            var wish=await WishModel.findOneAndDelete(filter);
        }
        console.log(x);
        res.send(x);
    }
))

router.post('/addfood', asynceHandler(
    async (req, res) => {
        const { name, imageurl, rating, orgins, tag, price } = req.body;

        const foodname = await FoodModel.findOne({ name });
        if (foodname) {
            res.status(BAD_STATUS).send("The Food name is already exist");
            return;
        }
        const addfood: Food = {
            id: '',
            name,
            favirote: false,
            imageurl,
            rating,
            orgins,
            tag,
            price
        }

        const food = await FoodModel.create(addfood);
        const user= await UserModel.find();
        const foodid=food.id;
        for(let i=0;i<user.length;i++)
        {
            var id=user[i].id;
            var newWish=new WishListModel({user:id,food:foodid,favirote:false});
            await newWish.save();
        }
        res.send(food);
    }
))

export default router;