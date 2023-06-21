
import{connect, ConnectOptions} from 'mongoose';


export const dbconnect=()=>{
    connect(process.env.MONGO_URL!,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=>console.log("connect successfully"),
        (error)=>console.log(error)
    )
}