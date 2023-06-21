import { Schema,Types, model } from "mongoose";
import { Food, FoodSchema } from "./food.model";
import { OrderStatus } from "../constent/order_status";


export interface LatLng{
    lat:string;
    lng:string;
}


export const LatLngSchema=new Schema<LatLng>(
    {
        lat:{type:String,required:true},
        lng:{type:String,required:true},
    }
)

export  interface OrderItem{
    food:Food;
    Price:number;
    quantity:number;
}

export const OrderItemSchema=new Schema<OrderItem>({
    food:{type:FoodSchema,required:true},
    Price:{type:Number,required:true},
    quantity:{type:Number,required:true},
})


export interface Order{
    id:string;
    items:OrderItem[];
    totalPrice:number;
    name:string;
    address:string;
    addressLatLag:LatLng;
    paymentId:string;
    status:OrderStatus;
    user:Types.ObjectId;
    date:string;
    createdAt:Date;
    updateAt:Date;
}

export const OrderSchema=new Schema<Order>({
    items:{type:[OrderItemSchema],required:true},
    totalPrice:{type:Number,required:true},
    name:{type:String,required:true},
    address:{type:String,required:true},
    addressLatLag:{type:LatLngSchema,required:true},
    paymentId:{type:String},
    status:{type:String,default:OrderStatus.NEW},
    createdAt:{type:Date},
    updateAt:{type:Date},
    date:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,required:true}
    
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});


export const OrderModel=model<Order>('order',OrderSchema);