import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pass } from 'src/app/data/login/changepassword';
import { passwordsMatchValidator } from 'src/app/data/login/validator/password_Match_Validator';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  changepd!: FormGroup;
  isSubmitted = false;
  pboon=false;
  pico='visibility';
  ptyp='password';
  cpboon=false;
  cpico='visibility';
  cptyp='password';
  constructor(private formbilder: FormBuilder, private activaterouter: ActivatedRoute, private login: LoginService, private rout: Router) { }

  ngOnInit(): void {
    this.login.logout1();

    this.changepd = this.formbilder.group({
      cpassword: ["", [Validators.required, Validators.minLength(5)]],
      cconformpssword: ["", [Validators.required, Validators.minLength(5)]]
    }, {
      validators: passwordsMatchValidator('cpassword', 'cconformpssword')
    })
  }

  get Fc() {
    return this.changepd.controls;
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
  submit() {
    this.isSubmitted = true;
    if (this.changepd.invalid) {
      console.log(this.changepd.invalid);
      return;
    }

    const Fv = this.changepd.value;

    const x:Pass={
      checkpassword:'',
      password:Fv.cpassword,
      confrompassword:Fv.cconformpssword
    }
    this.activaterouter.params.subscribe((params) => {
      if (params.token) {
        console.log(params.token);
        this.login.forgotpassword(params.token,x).subscribe(() => {
          this.rout.navigateByUrl('/login');
        })
      }
    })


  }
}
