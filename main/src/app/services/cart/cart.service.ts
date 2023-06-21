import { Injectable } from '@angular/core';
import { CartItem } from 'src/app/data/cart/cart';
import { Cartlist } from 'src/app/data/cart/cartitem';
import { Food } from 'src/app/data/food';
import{ BehaviorSubject,Observable, tap} from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/data/login/userinfo';
import { HttpClient } from '@angular/common/http';
import { FOOD_ADD_CART_URL, FOOD_SHOW_CART_URL } from 'src/app/data/constent/urls';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  CART_KEY:string='';
  user!:User;
private cart:CartItem=this.getCartToLocalStorage();
private cartSubject:BehaviorSubject<CartItem>=new BehaviorSubject(this.cart);
  constructor(loginservice:LoginService,private http:HttpClient,private rout:Router) {

    loginservice.userObeservable.subscribe((user)=>{
      this.user=user;
    })
   this.CART_KEY=this.user.email+"cart";
   console.log(this.CART_KEY);
  }

  addToCart(food:Food):void{
    var cartitem=this.cart.items.find(item=>item.food.id === food.id);
    if(cartitem)
    {
      return;
    }
    this.cart.items.push(new Cartlist(food));
    console.log(this.cart);
    this.setCartToLocalStorage();
  }
  removeFormCart(foodid:string):void{
    this.cart.items=this.cart.items.filter(item=>item.food.id!=foodid);
    this.setCartToLocalStorage();
    window.location.reload();
  }
  changeQuantity(foodid:string,quantity:number){
    var cartitem=this.cart.items.find(item=>item.food.id===foodid);
    if(!cartitem)
    {return;}
    cartitem.quantity=quantity;
    cartitem.Price=quantity*cartitem.food.price;
    this.setCartToLocalStorage();
  }
  clearCart(){
    this.cart=new CartItem();
    this.setCartToLocalStorage();
  }
  getCartObservable():Observable<CartItem>{
    return this.cartSubject.asObservable()
  }

  getCart(){
    return this.cartSubject.value;
  }


  private setCartToLocalStorage():void{
    this.cart.totalPrice=this.cart.items.reduce((prevSum,currentItem)=>prevSum+currentItem.Price,0);
    this.cart.count=this.cart.items.reduce((prevSum,currentCount)=>prevSum+currentCount.quantity,0);
    // this.addtoDatabase(this.cart).subscribe((cart)=>{
      const cartJson=JSON.stringify(this.cart);
      localStorage.setItem('cart',cartJson);
      // window.location.reload();
      this.rout.navigateByUrl("/cart");
    // });

    this.cartSubject.next(this.cart);
  }

  private getCartToLocalStorage():CartItem{

    const cartJson=localStorage.getItem('cart');
    if(cartJson)
    {
      // console.log(cartJson);
      return JSON.parse(cartJson);
    }
    else
    {
      return new CartItem();
    }

  }


//Add to database
  addtoDatabase(cart:CartItem):Observable<CartItem>{
    return this.http.post<CartItem>(FOOD_ADD_CART_URL,cart);
  }

  showCart():Observable<CartItem>{
    return this.http.get<CartItem>(FOOD_SHOW_CART_URL);
  }
}

