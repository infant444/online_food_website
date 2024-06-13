import {model,Schema,Types} from 'mongoose'
import { User, UserSchema } from './user.model';

export interface Feedback{
    id:string;
    name:string;
    email:string;
    rating:string;
    date:string;
    issue:string;
    user:Types.ObjectId;
}

const feedbackSchema=new Schema<Feedback>({
    user:{type:Schema.Types.ObjectId},
    name:{type:String,required:true},
    email:{type:String},
    rating:{type:String,required:true},
    date:{type:String,required:true},
    issue:{type:String,required:true},

},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true

})

export const feedbackModel=model<Feedback>("feedbackx",feedbackSchema);