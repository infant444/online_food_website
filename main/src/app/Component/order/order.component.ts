import { Component ,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/cart/order';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order:Order[]=[];
  constructor(orderservice:OrderService,toastrservice:ToastrService,private router:Router){
    orderservice.Order_item().subscribe({
      next:(order)=>{
        this.order=order;
        console.log(this.order);
      },
      error:(erroresponse)=>{
        toastrservice.warning(erroresponse.error,"Order list");
      }

    })
  }
  ngOnInit(): void {
  }
  createOrder(){
    this.router.navigateByUrl('/payment');
  }
}
