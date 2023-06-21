import { Component,OnInit} from '@angular/core';
import { User } from 'src/app/data/login/userinfo';
import { WishItem } from 'src/app/data/wishlist/wish';

import { LoginService } from 'src/app/service/login/login.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wish:WishItem[]=[];
  user!:User;
  constructor(private wishservice:WishlistService,login:LoginService){
    this.wishservice.showInWish().subscribe((service)=>{
      this.wish=service;
    })
    login.userObeservable.subscribe((newUser)=>{
      this.user=newUser;
  })
}
ngOnInit(): void {

}
}
