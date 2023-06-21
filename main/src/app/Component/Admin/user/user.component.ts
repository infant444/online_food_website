import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/data/login/userinfo';
import { LoginService } from 'src/app/service/login/login.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
user:User[]=[];
photo:string='../../../assets/images/proflie.png';
constructor(loginservice:LoginService,activate:ActivatedRoute,router:Router){
  console.log(loginservice.currentUser.token);
  loginservice.userDetail().subscribe((userserver)=>{
    this.user=userserver;

    console.log(this.user);
  })
activate.params.subscribe((params)=>{
  if(params.userid){
    loginservice.deleteUser(params.userid).subscribe(()=>{
      router.navigateByUrl('/user');
    });
  }
})
}

  ngOnInit(): void {

  }

}
