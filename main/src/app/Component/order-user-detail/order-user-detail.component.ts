import { Component,Input,OnInit} from '@angular/core';
import { Order } from 'src/app/data/cart/order';

@Component({
  selector: 'app-order-user-detail',
  templateUrl: './order-user-detail.component.html',
  styleUrls: ['./order-user-detail.component.css']
})
export class OrderUserDetailComponent  implements OnInit{

  @Input()
  order!:Order;
  constructor(){}
  ngOnInit(): void {

  }
}
