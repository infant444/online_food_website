import { Component ,OnInit ,Input} from '@angular/core';
import { CartService } from 'src/app/services/cart/cart.service';
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/data/login/userinfo';

import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-fild',
  templateUrl: './header-fild.component.html',
  styleUrls: ['./header-fild.component.css']
})
export class HeaderFildComponent implements OnInit {
  cartquenty=0;
  user!:User;
  Wishlist=0;
  menu=false;
  @Input()
  mantname="menu";
  @Input()
  menuclass="nav";
  constructor(private cartservice:CartService,private login:LoginService,wish:WishlistService,private rout:Router){
  this.cartservice.getCartObservable().subscribe((newCart)=>{
    this.cartquenty=newCart.count;
  })
  this.login.userObeservable.subscribe((newUser)=>{
    this.user=newUser;
    console.log(this.user.name);
    console.log(this.user.isAdmin);
  })

  wish.showInWish().subscribe((service)=>{
    this. Wishlist=service.length;
  })
  }
ngOnInit(): void {

}
change(){
  if(this.menu)
  {
    this.menuclass="nav";
    this.menu=false;
    this.mantname="menu";
  }
  else{
    this.menuclass="nav open";
    this.menu=true;
    this.mantname="cancel";
  }
}
logout(){
  this.login.logout();
}

login1(){
  this.menuclass="nav";
  this.mantname="menu";
this.rout.navigateByUrl("/login");
}
dashbord(){
  this.menuclass="nav";
  this.mantname="menu";
  this.rout.navigateByUrl("/dashbord");
}
wishlist(){
  this.menuclass="nav";
  this.mantname="menu";
this.rout.navigateByUrl("/wishlist");
}

cart(){
  this.menuclass="nav";
  this.mantname="menu";
this.rout.navigateByUrl("/cart");
}

info(){
  this.menuclass="nav";
  this.mantname="menu";
  this.rout.navigateByUrl("/info");
  }
  order(){
  this.menuclass="nav";
  this.mantname="menu";
    this.rout.navigateByUrl("/order");
    }
    home(){
  this.menuclass="nav";
  this.mantname="menu";
    this.rout.navigateByUrl("/");

    }
}
