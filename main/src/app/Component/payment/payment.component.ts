import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/cart/order';
import { PaymentService } from 'src/app/services/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  order!:Order;

  constructor(private paymentservice:PaymentService,toastrservice: ToastrService,router:Router){
    this.paymentservice.newOrderForCurrentUser().subscribe({
      next:(order)=>{
        this.order=order;
        console.log(this.order);

     },
      error:(errorResponse)=>{

        toastrservice.error(errorResponse.error,"Order Page");
        router.navigateByUrl('/checkout');
      }
    })
  }

  ngOnInit(): void {

  }

}
