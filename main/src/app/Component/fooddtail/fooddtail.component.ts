import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/data/food';
import { CartService } from 'src/app/services/cart/cart.service';
import { FoodService } from 'src/app/services/food/food.service';
import { LoginService } from 'src/app/service/login/login.service';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/data/login/userinfo';
import { FavFood } from 'src/app/data/favfood';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';
@Component({
  selector: 'app-fooddtail',
  templateUrl: './fooddtail.component.html',
  styleUrls: ['./fooddtail.component.css']
})
export class FooddtailComponent implements OnInit{
  food!:Food;
  user!:User;
  constructor(activated:ActivatedRoute,
    private foodService:FoodService,
    private cartservice:CartService,
    private router:Router,
    private toastrservice:ToastrService,
    private login:LoginService,
    private wishlish:WishlistService){

    activated.params.subscribe((params)=>{
      if(params.id)
    {
      this.foodService.getFoodById(params.id).subscribe((serverFood)=>
      {
        this.food=serverFood;
      });
    }
    }

    )
  }

  addToCart():void{
    this.login.userObeservable.subscribe((newUser)=>{
      this.user=newUser;
      if(this.user.name)
      {
      this.cartservice.addToCart(this.food);
      // this.router.navigateByUrl('/cart');
      }
      else{
       this.toastrservice.error('Login first');
      }
    })


  }
ngOnInit(): void {

}
change(x:Food){
  if(x.favirote)
  {
    const y:FavFood={
      favarite:false
    }
    this.foodService.getFoodForUpdateByFavirote(x.id,y).subscribe(_=>{
      window.location.reload();
        })
  }
  else{
    const y:FavFood={
      favarite:true
    }
    this.foodService.getFoodForUpdateByFavirote(x.id,y).subscribe(_=>{
      window.location.reload();
    })
  }
}
}
