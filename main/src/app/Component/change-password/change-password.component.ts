import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pass } from 'src/app/data/login/changepassword';
import { passwordsMatchValidator } from 'src/app/data/login/validator/password_Match_Validator';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changepd!:FormGroup;
  isSubmit=false;
  pboon=false;
  pico='visibility';
  ptyp='password';
  npboon=false;
  npico='visibility';
  nptyp='password';
  cpboon=false;
  cpico='visibility';
  cptyp='password';
  constructor(private loginservice:LoginService,private formbilder:FormBuilder,private activate:ActivatedRoute,private rout:Router){}
  ngOnInit(): void {
    this.changepd=this.formbilder.group({
      password:["",[Validators.required,Validators.minLength(5)]],
      cpassword:["",[Validators.required,Validators.minLength(5)]],
      cconformpssword:["",[Validators.required,Validators.minLength(5)]]
    },{
      validators:passwordsMatchValidator('cpassword','cconformpssword')
    })
  }
  get Fc(){
    return this.changepd.controls;
  }
  nshow()
  {
    if(!this.npboon ){
      this.npico='visibility_off';
      this.nptyp='text';
      this.npboon=true;
    }
    else{
     this.npico='visibility';
       this.nptyp='password';
       this.npboon=false;
    }
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
  submit(){
    this.isSubmit=true;
    console.log("x");
    if(this.changepd.invalid){
      return;
    }
    const Fv=this.changepd.value;
    const x:Pass={
      checkpassword:Fv.password,
      password:Fv.cpassword,
      confrompassword:Fv.cconformpssword
    }
    console.log(x);
    this.activate.params.subscribe((params)=>{
      if(params.userid){
        this.loginservice.changepassword(params.userid,x).subscribe((user)=>{
          this.rout.navigateByUrl("/dashbord");
        });
      }
    });
  }
}
