import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Email_OTP } from 'src/app/data/login/email';
import { User } from 'src/app/data/login/userinfo';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'account-verify-alert',
  templateUrl: './account-verify-alert.component.html',
  styleUrls: ['./account-verify-alert.component.css']
})
export class AccountVerifyAlertComponent implements OnInit {
user!:User;
  constructor(private formbilder:FormBuilder,private activaterouter:ActivatedRoute,private login:LoginService,private rout:Router){}

  ngOnInit(): void {

  }
 resend(){
  this.login.userObeservable.subscribe((user)=>{
    this.user=user;
    const verification:Email_OTP={
      id:user.id.toString(),
      name:user.name,
      email:user.email,
    }
    this.login.OtpMail(verification).subscribe(_=>{
      this.rout.navigateByUrl('/');
    })
  })
 }
}
