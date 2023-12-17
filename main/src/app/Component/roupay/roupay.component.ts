import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/cart/order';
import { User } from 'src/app/data/login/userinfo';
import { LoginService } from 'src/app/service/login/login.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

declare var Razorpay: any;
@Component({
  selector: 'app-roupay',
  templateUrl: './roupay.component.html',
  styleUrls: ['./roupay.component.css']
})
export class RoupayComponent implements OnInit {

  @Input()
  order!: Order;

  user!: User;
  orderid!:string;
  constructor(private login: LoginService, private toastrService:ToastrService,private orderservice:OrderService,private cartservice:CartService,private router:Router) { }
  ngOnInit(): void {
    this.login.userObeservable.subscribe((user) => {
      this.user = user;
    })
  }

  pay() {
    const option = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.order.totalPrice * 100,
      name: this.order.name,
      key: 'rzp_test_vYk5uom15Fs9iM',
      image: '../../assets/images/food/logo.png',
      handler: (response: any) => {
        // Payment success callback
        this.paymentSuccess(response);
      },
      prefill: {
        name: this.order.name,
        email: this.user.email,
        phone: this.user.phono
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss: () => {
          this.toastrService.error('Payment Failed', 'Error');
        }
      }
    }

    Razorpay.open(option)
  }

  paymentSuccess(response: any) {
    this.order.paymentId = response.razorpay_payment_id;
    console.log(this.order);
    if(this.order.paymentId)
    {
      this.orderservice.pay(this.order).subscribe(
        {
          next: (orderId) => {
            this.orderid=orderId;
            this.cartservice.clearCart();
            this.orderservice.sendmail(orderId).subscribe(()=>{
              this.router.navigateByUrl('/track/' + this.orderid);
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );

            })

          }
        }
      );
    }
    else{
      this.toastrService.error('Payment Save Failed', 'Error');

    }

  }
}
