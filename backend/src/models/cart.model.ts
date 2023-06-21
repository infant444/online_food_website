import { model,Schema,Types } from "mongoose";
import { Food, FoodSchema } from "./food.model";


export interface Cartlist{
    food:Food[];
    quantity:number;
    Price:number;
}


export const CartlistSchema=new Schema<Cartlist>({
    food:{type:[FoodSchema],required:true},
    quantity:{type:Number,required:true},
    Price:{type:Number,required:true},
})


export interface Cart{
    id:string;
    items:Cartlist[];
    totalPrice:number;
    count:number;
    user:Types.ObjectId;
}


export const CartSchema=new Schema<Cart>({
    items:{type:[CartlistSchema],required:true},
    totalPrice:{type:Number,required:true},
    count:{type:Number,required:true},
    user:{type:Schema.Types.ObjectId,required:true},
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
}
)


export const CartModel=model<Cart>("Cart",CartSchema);