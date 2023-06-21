import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/data/cart/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {

  order!:Order;
  constructor(activaterouter:ActivatedRoute,orderservicer:OrderService){
    activaterouter.params.subscribe((params)=>{
      if(params.Orderid)
      {
        orderservicer.trackOrderById(params.Orderid).subscribe((order)=>{
          this.order=order;
          console.log(order);
        });
      }
    })
  }
  ngOnInit(): void {

  }

}
