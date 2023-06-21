import Router from 'express';
import { sampleUser } from '../data';
import jwt, { verify } from 'jsonwebtoken';
import asynceHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { BAD_STATUS } from '../constent/status';
import bcrypt from 'bcryptjs';
import nodeMailer from 'nodemailer';
import Mailgen from 'mailgen';
import { WishListModel } from '../models/wish.model';
import { FoodModel } from '../models/food.model';
// import { userPhoto, userPhotoModel } from '../models/userphoto.model';
import auth from '../middleware/auth.mid';
import { WishModel } from '../models/wishlist.model';
import { Feedback, feedbackModel } from '../models/feedback.model';

const router=Router();
// router.use(auth);
router.get("/seed",asynceHandler(
    async (req,res)=>{
     const foodCount=await UserModel.countDocuments();
     if(foodCount>0)
     {
         res.send("Seed is already done");
         return;
     }
     await UserModel.create(sampleUser);
         res.send("Seed is Done");
     })
 )
router.post("/login",asynceHandler(
   async (req,res)=>{
        const {email,password}=req.body;
        console.log(email,password);
        const user=await UserModel.findOne({email});
        
        if(user && (await bcrypt.compare(password, user.password)))
        {
            res.send(genarateTockenResponse(user));
        }
        else
        {
            res.status(BAD_STATUS).send("Username and pasword is inValid");
        }
        }
))

router.post('/register',asynceHandler(
    async (req,res)=>{
        const{name,email,password,address}=req.body;
        const user=await UserModel.findOne({email});
        if(user)
        {
            res.status(BAD_STATUS).send("User is already exist,please login");
            return;
            
        }
        const encryptedPassword=await bcrypt.hash(password,10);

        const newUser:User={
            id:'',
            name,
            email:email.toLowerCase(),
            password:encryptedPassword,
            address,
            profile:" ",
            phono:0,
            otp_verification:false,
            isAdmin:false
        }
        const dbUser=await  UserModel.create(newUser);
        const food=await FoodModel.find();
        const userid=dbUser.id;
        for(var i=0;i<food.length;i++){
            var id=food[i].id;
            var newWish=new WishListModel({user:userid,food:id,favirote:false});
            await newWish.save();
        }
        //  const newImg=new userPhotoModel({user:dbUser.id,photo:" "});
        // await newImg.save();
        
        res.send(genarateTockenResponse(dbUser));
    }
))
router.post("/change/profile/upload/:userid",asynceHandler(
   
    async(req,res)=>{
        const{photo,email,name,address,phono}=req.body;
        var x=await UserModel.findById(req.params.userid);
        if(photo){
            x=await UserModel.findByIdAndUpdate(req.params.userid,{profile:photo});
            console.log("photo");
        }
        if(x?.email!= email && email){
            x=await UserModel.findByIdAndUpdate(req.params.userid,{email:email});
            x=await UserModel.findByIdAndUpdate(req.params.userid,{otp_verification:false});
            console.log("email");
        }
        if(x?.name!=name && name){
            x=await UserModel.findByIdAndUpdate(req.params.userid,{name:name});
            console.log("name");


        }
        if(x?.address!=address && address){
            x=await UserModel.findByIdAndUpdate(req.params.userid,{address:address});
            console.log("address");

        }
        if(x?.phono!=phono && phono){
            x=await UserModel.findByIdAndUpdate(req.params.userid,{phono:phono});
            console.log("phono");

        }
        var x=await UserModel.findById(req.params.userid);
        if(x){
            console.log(x);
            res.send(genarateTockenResponse(x));
            return;
        }
        res.status(BAD_STATUS).send("Update failed");
    }
))
    const genarateTockenResponse=(user:any)=>{
        const token=jwt.sign({
            id:user.id,email:user.email,isAdmin:user.isAdmin
        },process.env.JWT_SECRET!,{
           expiresIn:"60d"
        })

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            address: user.address,
            profile:user.profile,
            phono:user.phono,
            isAdmin: user.isAdmin,
            otp_verification:user.otp_verification,
            token: token,
          };
 }

 router.get("/userdetail",asynceHandler(
    async (req,res)=>{
        const user=await UserModel.find();
        res.send(user);
    }
 ))
 router.delete("/deleteuser/:userid",asynceHandler(
    async (req,res)=>{
        const user=await UserModel.findByIdAndDelete(req.params.userid);
        const det=await WishModel.deleteMany({user:req.params.userid});
        // const delpro=await userPhotoModel.deleteOne({user:req.params.userid});
        res.send(user);

    }
 ))

 router.post("/changepassword/:userid",asynceHandler(
    async(req,res)=>{
        const{checkpassword,password}=req.body; 
        const user= await UserModel.findById(req.params.userid);
        console.log(user);
        if(user && (await bcrypt.compare(checkpassword, user.password))){
            const x=await bcrypt.hash(password,10);
            const ynew =await UserModel.findByIdAndUpdate(req.params.userid,{password:x});
            console.log(ynew);
            res.send(ynew);    
        }
        res.status(BAD_STATUS).send();
    }
 ))

 router.post("/email/verification",asynceHandler(
    async(req,res)=>{
        const{email}=req.body;
        const user=await UserModel.findOne({email});
        if(user)
        {
            res.status(BAD_STATUS).send(false);
            return;
        }
        res.send(true)
    }
 ))




 router.post("/forgotpassword/email",asynceHandler(
    async (req,res)=>{

        const {email}=req.body;
        let config={
            service:'gmail',
            auth:{
                user:'infant.webdesign@gmail.com',
                pass:'zvgalednltguezpo',
            }
        }
        const user=await UserModel.findOne({email:email});
        if(user){
        const id=user?.id;
        const name=user?.name;
        const x:any={
            id:id,
            name:name,
            email:email,
        }
        const token=generateverificationtocken(x);

        let transporter = nodeMailer.createTransport(config);

        let MailGenerator=new Mailgen({
            theme:"default",
            product:{
                name:'<h2 style=" width:100%;height:100%;background-color:rgb(14, 228, 143);color:white;font: 2rem sans-serif;font-weight: 800;text-align: center; padding:2.5rem; margin:0">Food Delar</h2>',
                link:"http://localhost:4200/",
            },
        })
        let response={
            body:{
                name:name,
                intro:'We have received a request to reset your password for your '+email+' account. We generated the link to reset password to it work 24h create a new password of your choice.',
                title:'<h2 style=" width:100%;color:rgb(14, 228, 143);font: 2rem sans-serif;font-weight: 800;text-align: center;letter-spacing: 7px;">Forgot password Verification</h2>',
                action: {
                    instructions: 'Click the button below to reset password:',
                    button: {
                      color: '#22BC66',
                      text: 'Verify Email',
                      link: 'http://localhost:4200/user/forgot/password/'+token,
                    },
                  },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }

        let mail=MailGenerator.generate(response);
          let message={
            from: '"🍱Food Delar " <infant.webdesign@gmail.com>',
            to:name+'<'+ email+'>', 
            subject: "Reset the password",
            html: mail,
          }

          transporter.sendMail(message).then(()=>{

            res.send("sucessfully verification mail sended");
            return;
          }).catch(error=>{
            res.status(BAD_STATUS).send(error);
          })
    }
    else{
        res.status(BAD_STATUS).send('incorrect email');
    }
}

 ))


 router.post('/forgotpassword/:token',asynceHandler(
    async(req,res)=>{
        const token=req.params.token;
        const{password}=req.body;
        const x=verifyuserTocken(token);
        console.log(x);
        const user=await UserModel.findById(x.id);
        if(user) 
        {
            const pas=await bcrypt.hash(password,10);
            const user=await UserModel.findByIdAndUpdate(x.id,{password:pas});
            console.log(user);
            res.send(user);
        }
    }
 ))


 router.post("/mail",asynceHandler(
    async (req,res)=>{

        const {id,name,email}=req.body;
        let config={
            service:'gmail',
            auth:{
                user:'infant.webdesign@gmail.com',
                pass:'zvgalednltguezpo',
            }
        }
        const x:any={
            id:id,
            name:name,
            email:email,
        }
        const token=generateverificationtocken(x);

        let transporter = nodeMailer.createTransport(config);

        let MailGenerator=new Mailgen({
            theme:"default",
            product:{
                name:'<h2 style=" width:100%;height:100%;background-color:rgb(14, 228, 143);color:white;font: 2rem sans-serif;font-weight: 800;text-align: center; padding:2.5rem; margin:0">Food Delar</h2>',
                link:"http://localhost:4200/",
            },
        })
        let response={
            body:{
                name:name,
                intro:'Thank you for choosing the food Delar,Use the following confromation link to complete your Register procedures',
                title:'<h2 style=" width:100%;color:rgb(14, 228, 143);font: 2rem sans-serif;font-weight: 800;text-align: center;letter-spacing: 7px;">Account Verification</h2>',
                action: {
                    instructions: 'Click the button below to verify your email:',
                    button: {
                      color: '#22BC66',
                      text: 'Verify Email',
                      link: 'http://localhost:4200/email/verify/'+token,
                    },
                  },
                outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
            }
        }

        let mail=MailGenerator.generate(response);
          let message={
            from: '"🍱Food Delar " <infant.webdesign@gmail.com>',
            to:name+'<'+ email+'>', 
            subject: "🍽️ Your Food Delar launch code",
            html: mail,
          }

          transporter.sendMail(message).then(()=>{

            res.status(200).send("sucessfully verification mail sended");
            return;
          }).catch(error=>{
            res.status(BAD_STATUS).send(error);
          })
    }
 ))




const generateverificationtocken=(user:any)=>{
    console.log(user);
    const token=jwt.sign({
        id:user.id,email:user.email
    },process.env.JWT_EMAIL_VERIFICATION!,{
       expiresIn:"12h"
    })
    console.log(token);
    return token;
}

 router.post('/verification/:token',asynceHandler(
    async(req,res)=>{
        const{email}=req.body;
        // console.log(email);
        const x=verifyuserTocken(req.params.token);
        console.log(x);

        const user=await UserModel.findOne({email:email,otp_verification:false});
        // console.log(user);
        const id=user?.id;
        console.log(id);
        if(user && email===x.email){
            const login=await UserModel.findByIdAndUpdate(id,{otp_verification:true});
            res.send(login);
            return;
        }
        res.status(BAD_STATUS).send("Invalid email");
        
    }
 ))

const verifyuserTocken=(token:string)=>{
    if(!token){
        return;
    }
    try{
        const decoderedUser=jwt.verify(token,process.env.JWT_EMAIL_VERIFICATION!);
        console.log(decoderedUser);
        const x:any=decoderedUser;
        console.log(x.email);
        
        return x;

    }
    catch(error){

    }
}



    router.post("/feedback/sendx",asynceHandler(
        async(req,res)=>{
            const response=req.body;
            const feed=new feedbackModel({...response});
            await feed.save();
            res.send(feed);
        }
    ))
    router.get('/userid/:id',asynceHandler(
        async(req,res)=>{
            const user=await UserModel.findById(req.params.id);
            res.send(user);
        }
    ))

    router.get("/feedback",asynceHandler(
        async(req,res)=>{
         const feedback=await feedbackModel.find();
         res.send(feedback);
        }
    ))

    router.post("/feedback/:date",asynceHandler(
        async(req,res)=>{
            const {date}=req.body;
         const feedback=await feedbackModel.find({date:date});
         res.send(feedback);

        }

    ))

    router.delete("/feedback/delete/:feedbackid",asynceHandler(
        async(req,res)=>{
            console.log(req.params.feedbackid)
            const feedback=await feedbackModel.findByIdAndDelete(req.params.feedbackid);
            res.send(feedback);
        }
    ))
 export default router;