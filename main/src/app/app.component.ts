import { Component,OnInit} from '@angular/core';
import { LoginService } from './service/login/login.service';
import { User } from './data/login/userinfo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user!:User;
  constructor(private loginservice:LoginService){


  }
  ngOnInit(): void {
    this.loginservice.userObeservable.subscribe((userserver)=>{
      this.user=userserver;
    })
  }
  title = 'foodddelar';
}
