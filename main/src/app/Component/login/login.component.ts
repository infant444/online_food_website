import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../service/login/login.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  pboon=false;
  pico='visibility';
  ptyp='password';
  loginform!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  siteKey="6LeNmK8mAAAAAEwiJPFaHBIA0oV2Ha_ezvfLc17s";

  constructor(private formbilder:FormBuilder,
    private loginservice:LoginService,
    private activaterouter:ActivatedRoute,
    private router:Router
    ){

  }
ngOnInit(): void {
  this.loginform=this.formbilder.group({
    email:['',[ Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(5)]],
    recaptcha: ['', Validators.required]
  });


  this.returnUrl=this.activaterouter.snapshot.queryParams.returnUrl;
}
pshow()
{
  if(!this.pboon ){
    this.pico='visibility_off';
    this.ptyp='text';
    this.pboon=true;
  }
  else{
   this.pico='visibility';
     this.ptyp='password';
     this.pboon=false;
  }
}
get Fc(){
return this.loginform.controls;
}
submit()
{
  this.isSubmitted=true;
  if(this.loginform.invalid)
  {
    return;
  }
    this.loginservice.login({email:this.Fc.email.value,password:this.Fc.password.value}).subscribe(()=>{
      this.router.navigateByUrl(this.returnUrl);
    });

}
}
