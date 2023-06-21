import { Router } from "express";
import asynceHandler from 'express-async-handler';
import { BAD_STATUS } from "../constent/status";
import { Order, OrderModel } from "../models/order.model";
import { OrderStatus } from "../constent/order_status";
import auth from "../middleware/auth.mid";
import nodeMailer from "nodemailer"
import Mailgen from "mailgen";
import { UserModel } from "../models/user.model";
const router=Router();

router.use(auth);

router.post('/create',asynceHandler(
    async(req:any,res:any)=>{
        const requestOrder=req.body;

        if(requestOrder.items.length<=0)
        {
            res.status(BAD_STATUS).send("Cart is empty");
            return;
        }
        await OrderModel.deleteOne({
            user:req.user.id,
            status:OrderStatus.NEW
        });
        

        const newOrder=new OrderModel({...requestOrder,user:req.user.id});
        await newOrder.save();
        res.send(newOrder);
    }
))

router.get("/orderlist",asynceHandler(
    async(req:any,res)=>{
        const order=await OrderModel.find({user:req.user.id});
        if(!order){
            res.status(BAD_STATUS).send("Noting order is placed");
        }
        else{
            res.send(order);
        }
    }
))

router.get('/newOrderForCurrentUser',asynceHandler(
    async(req:any,res)=>{
        const order= await getNewOrderForCurrentUser(req);
        if(order) res.send(order);
        else res.status(BAD_STATUS ).send();
    }
))



router.post('/pay', asynceHandler( async (req:any, res) => {
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(BAD_STATUS).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('/track/:id',asynceHandler(
    async(req,res)=> {
        const order=await OrderModel.findById(req.params.id);
        res.send(order);
    }
))

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}




router.get("/payment/success/mail/:orderid",asynceHandler(
    async (req,res)=>{
        let config={
            service:'gmail',
            auth:{
                user:'infant.webdesign@gmail.com',
                pass:'zvgalednltguezpo',
            }
        }
        const order=await OrderModel.findById(req.params.orderid);
        const user=await UserModel.findById(order?.user.toString())
        
        // const token=generateverificationtocken(x);

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
                name:user?.name,
                intro:'Your order is Successfully places and the order id :'+order?.id,
                title:'<h2 style=" width:100%;color:rgb(14, 228, 143);font: 2rem sans-serif;font-weight: 800;text-align: center;letter-spacing: 7px;">Order successfully placed</h2>',
                table: {
                    data: [
                      {
                        title:'<b>name:</b>',
                        content:order?.name,
                      },
                      {
                        title:'<b>Address</b>',
                        content:order?.address,
                      },
                      {
                        title:'<b>Amount</b>',
                        content:"₹"+order?.totalPrice,
                      },
                      {
                        title:'<b>Paymentid</b>',
                        content:order?.paymentId,
                      },
                      {
                        title:'<b>Payment status</b>',
                        content:'<p style:"color:lightgreen">'+order?.status+'</p>',
                      },
                    ],
                    color:"ligthgray",
                    border:"2px solid black",
                },
                // content:'<div style:"padding:1.2rem;border:5px solid lightgray;font-size:2rem"><b>name:</b>'+order?.name+'<br><b>Address</b>'+order?.address+'<br><b>Amount</b>'+order?.totalPrice+'<br><b>Paymentid</b>'+order?.paymentId+'<br><b>Payment status</b>'+order?.status+'</div>',
                outro: 'Thank you for using our product. If you have any questions, feel free to contact us..'
            }
        }

        let mail=MailGenerator.generate(response);
          let message={
            from: '"🍱Food Delar " <infant.webdesign@gmail.com>',
            to:user?.name+'<'+ user?.email+'>', 
            subject: "payment is sucssfully paid",
            html: mail,
          }

          transporter.sendMail(message).then(()=>{

            res.send();
            return;
          }).catch(error=>{
            res.status(BAD_STATUS).send(error);
          })
    }
 ))


 router.get("/orderlist/all",asynceHandler(
    async(req:any,res)=>{
        const order=await OrderModel.find();
        if(!order){
            res.status(BAD_STATUS).send("Noting order is placed");
        }
        else{
            res.send(order);
        }
    }
))


 router.post("/orderlist/date",asynceHandler(
    async(req,res)=>{
        const {day}=req.body;
        const order=await OrderModel.find({date:day});
        console.log(order);
        res.send(order);
    }
 ))
 router.post("/orderlist/change/status/:orderid",asynceHandler(
    async(req,res)=>{
        const {status}=req.body;
        const order=await OrderModel.findByIdAndUpdate(req.params.orderid,{status:status});

        res.send(order);
    }
 ))
 router.delete("/orderlist/delete/:orderid",asynceHandler(
    async(req,res)=>{
        const order=await OrderModel.findByIdAndDelete(req.params.orderid);
        res.send(order);
    }
 ))
 
export default router;