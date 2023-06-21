import { Component,OnInit, VERSION} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from '../../service/login/login.service'
import { ActivatedRoute, Router } from '@angular/router';
import { passwordsMatchValidator } from 'src/app/data/login/validator/password_Match_Validator';
import { Register } from 'src/app/data/login/register';
import { ToastrService } from 'ngx-toastr';
import { Email_OTP } from 'src/app/data/login/email';
import { User } from 'src/app/data/login/userinfo';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Registerform!:FormGroup;
  isSubmitted=false;
  returnUrl='';
  // required='Shoud not be empty';
  // minlength='Field is too short';
  // maxlength='Field is too long';
  // email='email is not valid';
  pboon=false;
  pico='visibility';
  ptyp='password';
  cpboon=false;
  cpico='visibility';
  cptyp='password';
  user!:User;
  constructor(private formbilder:FormBuilder,
    private loginservice:LoginService,
    private activaterouter:ActivatedRoute,
    private router:Router,
    private toastrservice: ToastrService,
    ){}
ngOnInit(): void {
  this.Registerform=this.formbilder.group({
    name:['',[Validators.minLength(5),Validators.required]],
    email:['',[ Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(5),Validators.maxLength(12)]],
    confirmPassword:['',[Validators.required,]],
    address:['',[Validators.required,Validators.minLength(10)]]
  },{
    validators:passwordsMatchValidator('password','confirmPassword')
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
cpshow()
{
  if(!this.cpboon){
    this.cpico='visibility_off';
    this.cptyp='text';
    this.cpboon=true;
  }
  else{
   this.cpico='visibility';
     this.cptyp='password';
     this.cpboon=false;
  }
}
get Fc(){
  return this.Registerform.controls;
  }

// notMatch(passwordControlName:string,confirmPasswordControlName:string){
// return(formGroup:FormGroup)=>{
//   const passwordControl=formGroup.controls[passwordControlName];
//   const confirmPasswordControl=formGroup.controls[confirmPasswordControlName];
//   if(confirmPasswordControl.errors && !confirmPasswordControl.errors.notMatch)
//   {
//     return
//   }

//   if(passwordControl.value !== confirmPasswordControl.value){
//     confirmPasswordControl.setErrors({notMatch: true});
//   }
//   else{
//     confirmPasswordControl.setErrors(null);
//   }
// }
// }










submit()
{
  this.isSubmitted=true;
  if(this.Registerform.invalid)
  {
    console.log(this.Registerform.invalid);
    return;
  }

    const fv=this.Registerform.value;
    const user :Register={
      name:fv.name,
      email:fv.email,
      password:fv.password,
      confirmPassword:fv.confirmPassword,
      address:fv.address
    };

    this.loginservice.register(user).subscribe(_ =>{
      this.loginservice.userObeservable.subscribe((user)=>{
        this.user=user;
        const verification:Email_OTP={
          id:user.id.toString(),
          name:user.name,
          email:user.email,
        }
        this.loginservice.OtpMail(verification).subscribe(_=>{
          this.router.navigateByUrl(this.returnUrl);
        })
        this.router.navigateByUrl(this.returnUrl);
      })


    })



}
}
