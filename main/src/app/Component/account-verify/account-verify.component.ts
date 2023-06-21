import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Email_OTP } from 'src/app/data/login/email';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-account-verify',
  templateUrl: './account-verify.component.html',
  styleUrls: ['./account-verify.component.css']
})
export class AccountVerifyComponent implements OnInit{

  Registerform!:FormGroup;
  isSubmitted=false;
  constructor(private formbilder:FormBuilder,private activaterouter:ActivatedRoute,private login:LoginService,private rout:Router){}

  ngOnInit(): void {
    this.login.logout1();

    this.Registerform=this.formbilder.group({
    email:['',[ Validators.required,Validators.email]],
    })
  }

  get Fc(){
    return this.Registerform.controls;
    }

    submit()
{
  this.isSubmitted=true;
  if(this.Registerform.invalid)
  {
    console.log(this.Registerform.invalid);
    return;
  }

    const fv=this.Registerform.value;

    const x:Email_OTP={
      id:'',
      email:fv.email,
      name:'',
    }
    this.activaterouter.params.subscribe((params)=>{
      if(params.token){
        console.log(params.token);
        this.login.Verifyuser(params.token,x).subscribe(()=>{
          this.rout.navigateByUrl('/login');
        })
      }
    })


}
}
