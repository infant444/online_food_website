import { LatLng } from "leaflet";
import { Cartlist } from "./cartitem";

export class Order{
  id!:string;
  items:Cartlist[]=[];
  totalPrice!:number;
  name!:string;
  address!:string;
  addressLatLag?:LatLng;
  paymentId!:string;
  date!:string;
  createdAt!:Date;
  updateAt!:Date;
  user!:string;
  status!:string;
}
