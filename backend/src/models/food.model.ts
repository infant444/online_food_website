import { Schema, model } from "mongoose";
export const FOOD_KEY='food';
export interface Food{
    id:string;
    name:string;
    favirote:boolean;
    imageurl:string;
    rating:number;
    orgins:string[];
    tag:string[];
    price:number;
}


export const FoodSchema=new Schema<Food>(
    {
        name:{type:String, required:true},
        price:{type:Number, required:true},
        tag:{type:[String]},
        favirote:{type:Boolean, default:false},
        imageurl:{type:String, required:true},
        rating:{type:Number, required:true},
        orgins:{type:[String], required:true},
    },{
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        },
        timestamps:true

    }
);

export const FoodModel=model<Food>(FOOD_KEY,FoodSchema);