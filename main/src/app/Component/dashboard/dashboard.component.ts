import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Email_OTP } from 'src/app/data/login/email';
import { User } from 'src/app/data/login/userinfo';
import { userPhoto } from 'src/app/data/login/userupload';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{

  user!:User;
  photo:string='../../../assets/images/proflie.png';
  constructor(private loginservice:LoginService,private activate:ActivatedRoute,private router:Router){
  }

  ngOnInit(): void {

    this.loginservice.userObeservable.subscribe((user)=>{
      this.user=user;
      // console.log(this.user.profile);
      if(this.user.profile===" "){
      }
      else{
        this.photo=this.user.profile;
      }

    })




    this.activate.params.subscribe((params)=>{
      if(params.userid){
        this.loginservice.deleteUser(params.userid).subscribe(()=>{
          this.loginservice.logout1();
    this.router.navigateByUrl("/");
        });
      }
    })

  }
  Delete(){
    this.router.navigateByUrl("deleteuser/profile/"+this.user.id);
  }
  logout()
  {
    this.loginservice.logout();
  }
  changepassword(){
    this.router.navigateByUrl("user/profile/changepassword/"+this.user.id);
  }
  edit(){
    this.router.navigateByUrl("/profile");
  }
  verfi(){
    const verification:Email_OTP={
      id:this.user.id.toString(),
      name:this.user.name,
      email:this.user.email,
    }
    this.loginservice.OtpMail(verification).subscribe(_=>{
      this.router.navigateByUrl('/dashbord');
    })
  }
  feedback(){
    this.router.navigateByUrl('user/feedback/'+this.user.id);
  }
}
