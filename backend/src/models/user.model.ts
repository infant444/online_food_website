import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    profile:string;
    phono:number;
    name:string;
    address:string;
    otp_verification:boolean;
    isAdmin:boolean;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profile:{type: String, required: true},
    phono:{type: Number, required: true},
    address: {type: String, required: true},
    otp_verification:{type:Boolean,required: true},
    isAdmin: {type: Boolean, required: true},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});



export const UserModel = model<User>('user', UserSchema);