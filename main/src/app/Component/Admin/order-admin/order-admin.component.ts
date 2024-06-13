import { Component , OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { OrderService } from 'src/app/services/order/order.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Order } from 'src/app/data/cart/order';
import { LocationService } from 'src/app/services/location/location.service';
import { latLng } from 'leaflet';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-order-admin',
  templateUrl: './order-admin.component.html',
  styleUrls: ['./order-admin.component.css']
})
export class OrderAdminComponent implements OnInit {

    datePipe = new DatePipe('en-US');
    currentDate = new Date();
    dateform!:FormGroup;
    curr !:string;
    formattedDate1:any;
    order:Order[]=[];
    status!:string[];
    lat!:any;
    lng!:any;
    blur:boolean=false;

  constructor(private orderservice:OrderService,private formbilder:FormBuilder,private location:LocationService,private tostar:ToastrService){}

ngOnInit(): void {
  this.formattedDate1 = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
this.dateform=this.formbilder.group({
  date:["",[]],
})
this.location.getCurrentLocation().subscribe((latLng)=>{
  const l=latLng;
  this.lat=l.lat;
  this.lng=l.lng;
})
this.orderservice.Order_item_all().subscribe((order)=>{
  this.order=order;
  console.log(this.order);
  console.log(this.order);

})
}

get Fc(){
  return this.dateform.controls;
}

submit(){
  const date:any={day:this.Fc.date.value,}
  this.orderservice.Order_item_Date(date).subscribe((order)=>{
  this.order=order;
  })
  console.log(date);
}
changeStatus(x:string,id:string){
  const status:any={status:x,}
  if(x=="CANCELED"){
    this.orderservice.Order_item_delete(id).subscribe(()=>{
    this.tostar.success("the order successfully cancel");
    window.location.reload();
    })
  }
  else{
    this.orderservice.Order_item_change_status(id,status).subscribe(()=>{
      this.tostar.success("successfully updated");
    })
  }

}
cb() {
  if(this.blur){
    this.blur=false;
  }
  else{
    this.blur=true;
  }
  }
}
