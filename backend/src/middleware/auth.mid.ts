import { verify } from "jsonwebtoken";
import { UNATHORIZED_STATUS } from "../constent/status";


export default(req:any,res:any,next:any)=>{
    const token=req.headers.access_token as string;
    if(!token)
    {
        return res.status(UNATHORIZED_STATUS).send('login the user');
    }

    try{
        const decoderedUser=verify(token,process.env.JWT_SECRET!);
        console.log(decoderedUser);
        req.user=decoderedUser;
    }catch(error){
        res.status(UNATHORIZED_STATUS).send();
    }
    return next();
}