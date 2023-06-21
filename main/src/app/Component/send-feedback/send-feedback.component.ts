import { DatePipe } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Feedback } from 'src/app/data/feedback/feedback';
import { User } from 'src/app/data/login/userinfo';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent implements OnInit{
  user!:User;
  feedbackform!:FormGroup;
  issubmitted=false;
  formattedDate1:any;
  datePipe = new DatePipe('en-US');
  currentDate = new Date();
  x="VERY_GOOD";
  constructor(private loginservice:LoginService,private formbiulder:FormBuilder,private router:Router){}
ngOnInit(): void {
  this.formattedDate1 = this.datePipe.transform(this.currentDate, 'yyyy-MM-dd');

  this.loginservice.userObeservable.subscribe((user)=>{
    this.user=user;
  })
  this.feedbackform=this.formbiulder.group({
    name:[this.user.name,[Validators.required]],
    email:[this.user.email,[Validators.required]],
    rating:['',[Validators.required]],
    issue:['',[Validators.required]],
  });
}


get Fc(){
  return this.feedbackform.controls;
}
submit(){
this.issubmitted=true;
if(this.feedbackform.invalid){
  return;
}
const Fv=this.feedbackform.value;
const feed:Feedback={
  id:'',
  name:Fv.name,
  email:Fv.email,
  rating:Fv.rating,
  date:this.formattedDate1,
  issue:Fv.issue,
  user:this.user.id.toString(),
}
console.log(feed);
this.loginservice.sendfeedback(feed).subscribe(()=>{
  this.router.navigateByUrl('/dashbord');
})
}


}
