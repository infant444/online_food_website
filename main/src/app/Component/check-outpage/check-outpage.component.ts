import { DatePipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/cart/order';
import { LoginService } from 'src/app/service/login/login.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-check-outpage',
  templateUrl: './check-outpage.component.html',
  styleUrls: ['./check-outpage.component.css']
})
export class CheckOutpageComponent implements OnInit {
  order:Order=new Order();
  checkOutForm!:FormGroup;
  formattedDate1:any;
  datePipe = new DatePipe('en-US');
  currentDate = new Date();
  constructor(cartservices:CartService,
    private formbilder:FormBuilder,
    private loginservice:LoginService,
    private toasterService:ToastrService,
    private orderservice:OrderService,
    private router:Router){
      const cart=cartservices.getCart();
      this.order.items=cart.items;
      this.order.totalPrice=cart.totalPrice;
    }

  ngOnInit(): void {
    this.formattedDate1 = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
    var{name,address}=this.loginservice.currentUser;
    this.checkOutForm=this.formbilder.group({
      name:[name,Validators.required],
      address:[address,Validators.required]
    });
  }
  get Fc(){
    return this.checkOutForm.controls;
  }
createOrder(){
  if(this.checkOutForm.invalid)
  {
    this.toasterService.warning('please fill the user information','Invalid Data');
    return;
  }

  if(!this.order.addressLatLag)
  {
    this.toasterService.warning('please selected the location on the map','Loction');
    return;
  }
  this.order.name=this.Fc.name.value;
  this.order.address=this.Fc.address.value;
this.order.date=this.formattedDate1;
  this.orderservice.create(this.order).subscribe({
    next:()=>{
      this.router.navigateByUrl('/payment');
    },
    error:(errorResponse)=>{
      this.toasterService.error(errorResponse.error,'cart');
    }
  })

}


}
