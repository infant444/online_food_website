import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Email_OTP } from 'src/app/data/login/email';
import { LoginService } from 'src/app/service/login/login.service';

type NewType = ActivatedRoute;

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {
  Mailform!:FormGroup;
  isSubmitted=false;
  constructor(private formbilder:FormBuilder,private activaterouter:ActivatedRoute,private login:LoginService,private rout:Router,private toster:ToastrService){}

  ngOnInit(): void {
    this.login.logout1();

    this.Mailform=this.formbilder.group({
    email:['',[ Validators.required,Validators.email]],
    })
  }

  get Fc(){
    return this.Mailform.controls;
    }

    submit()
{
  this.isSubmitted=true;
  if(this.Mailform.invalid)
  {
    console.log(this.Mailform.invalid);
    return;
  }

    const fv=this.Mailform.value;

    const x:Email_OTP={
      id:'',
      email:fv.email,
      name:'',
    }

        this.login.forgotpasswordemailsend(x).subscribe({
          next:()=>{
            this.toster.success("successfully email send");
          },
        error:(err)=>{
          this.toster.error(err.error,"Fail to send mail");
        }
      })
      }
    }
