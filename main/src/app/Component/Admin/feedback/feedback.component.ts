import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/data/cart/order';
import { Feedback } from 'src/app/data/feedback/feedback';
import { LoginService } from 'src/app/service/login/login.service';
import { LocationService } from 'src/app/services/location/location.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent  implements OnInit{
  datePipe = new DatePipe('en-US');
    currentDate = new Date();
    dateform!:FormGroup;
    curr !:string;
    formattedDate1:any;
    feedback:Feedback[]=[];
    status!:string[];

  constructor(private login:LoginService,private formbilder: FormBuilder,private activate:ActivatedRoute,private tostar:ToastrService){}

ngOnInit(): void {
  this.login.seefeedback().subscribe((Feedback)=>{
    this.feedback=Feedback;
    console.log(this.feedback);
  })
  this.formattedDate1 = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');
this.dateform=this.formbilder.group({
  date:["",[]],
})





}
get Fc(){
  return this.dateform.controls;
}
submit(){
  const date:any={day:this.Fc.date.value,}
  this.login.filterfeedback(date).subscribe((Feedback)=>{
    this.feedback=Feedback;
  })
}

delete(x:string){
  this.login.deletefeedback(x).subscribe(()=>{
    window.location.reload();
  })
}
}

