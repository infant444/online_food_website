
import{Schema,Types,model} from "mongoose";


export interface Wish{
    id:string;
    user:Types.ObjectId;
    food:Types.ObjectId;
    favirote:boolean;
}

export const WishSchema=new Schema<Wish>(
    {
        user:{type:Schema.Types.ObjectId,required:true},
        food:{type:Schema.Types.ObjectId,required:true},
        favirote:{type:Boolean,default:false},
    },{
        timestamps: true,
        toJSON:{
            virtuals: true
        },
        toObject:{
            virtuals: true
        }
    }
);


export const WishListModel=model<Wish>("Wishlist",WishSchema);