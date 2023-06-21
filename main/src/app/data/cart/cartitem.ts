import { Food } from "../food";
export class Cartlist{
  constructor(public food:Food){}
  quantity:number=1;
  Price:number=this.food.price;
}
