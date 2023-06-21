import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/cart/order';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';
// window.paypal
declare var paypal: any;
@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {


  @Input()
  order!:Order;



  @ViewChild('paypal', {static: true})
  paypalElement!:ElementRef;


orderid!:string;
  constructor(private orderservice:OrderService,private cartservice:CartService,private router:Router,private toastrService:ToastrService){}

  ngOnInit(): void {


    const self = this;
    paypal
    .Buttons({
      createOrder: (data: any, actions: any) => {
        console.log("c");
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      onApprove: async (data: any, actions: any) => {
        const payment = await actions.order.capture();
        this.order.paymentId = payment.id;
        self.orderservice.pay(this.order).subscribe(
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

            },
            error: (error) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    })
    .render(this.paypalElement.nativeElement);

    // const self=this;
    // paypal
    // .Buttons({
    //   createOrder:(data:any,actions:any)=>{
    //     return actions.order.create({
    //       purchase_units:[
    //         {
    //           amount:{
    //             currency_code:'INR',
    //             value:self.order.totalPrice,
    //           },
    //         },
    //       ],
    //     });
    //   },

    //   onApprove:async (data:any,action:any) => {
    //     const payment=await action.order.capture();
    //     this.order.paymentId=payment.id;
    //     self.orderservice.pay(this.order).subscribe(
    //       {
    //         next:(orderId)=>{
    //           console.log(orderId)
    //           this.cartservice.clearCart();
    //           this.router.navigateByUrl('/track/'+orderId);
    //           this.toastrService.success('payment saved sucessfully','success');
    //         },
    //         error:(error)=> {
    //           this.toastrService.error('payment save Failed','Error');
    //         }
    //       }
    //     );

    //   },
    //   onError:(err:any)=>{
    //     this.toastrService.error('Payment Failed','Error');
    //     console.log(err);
    //   },
    // })
    // .render(this.paypalElement.nativeElement);


  }

}
