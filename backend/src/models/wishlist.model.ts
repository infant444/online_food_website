import { Schema, model,Types } from "mongoose";
export const FOOD_KEY='food';
export interface Wishlist{
    id:string;
    name:string;
    imageurl:string;
    user:Types.ObjectId;
    food:Types.ObjectId;
}
export const FoodSchema=new Schema<Wishlist>(
    {
        name:{type:String, required:true},
        imageurl:{type:String, required:true},
        food:{type:Schema.Types.ObjectId, required:true},
        user:{type:Schema.Types.ObjectId, required:true},


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

export const WishModel=model<Wishlist>("Wishlist_food",FoodSchema);