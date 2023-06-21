
import{connect, ConnectOptions} from 'mongoose';


export const dbconnect=()=>{
    connect("mongodb+srv://Infant:Adhijoe75@cluster0.fom5pd8.mongodb.net/fooddelar?retryWrites=true&w=majority",{
        useNewUrlParser:true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
        ()=>console.log("connect successfully"),
        (error)=>console.log(error)
    )
}