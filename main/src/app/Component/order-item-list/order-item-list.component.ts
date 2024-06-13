import { Component ,Input,OnInit} from '@angular/core';
import { CartItem } from 'src/app/data/cart/cart';
import { Order } from 'src/app/data/cart/order';

@Component({
  selector: 'order-item-list',
  templateUrl: './order-item-list.component.html',
  styleUrls: ['./order-item-list.component.css']
})
export class OrderItemListComponent implements OnInit{



  @Input()
  order!:Order;

  xy:any[]=[];
  constructor(){
  }


ngOnInit(): void {
  this.xy=this.order.items;
  this.xy=this.xy.reverse();
}
}
