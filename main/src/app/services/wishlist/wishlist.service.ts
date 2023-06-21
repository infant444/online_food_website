import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{ BehaviorSubject,Observable} from 'rxjs';
import { FOOD_FAV_URL } from 'src/app/data/constent/urls';
import { Food } from 'src/app/data/food';
import { WishItem } from 'src/app/data/wishlist/wish';


@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }

  showInWish():Observable<WishItem[]>{
    return this.http.get<WishItem[]>(FOOD_FAV_URL)
  }

}


//Local storage concept if you need to it

// WISHLIST_KEY:string='Wish list';


// private wish:WishList=this.getWishListFromLocalStorage();
// private wishSubject:BehaviorSubject<WishList>=new BehaviorSubject(this.wish);

//

// addToWish(food:Food):void{
//   var wishfood=this.wish.items.find(item=>item.food.id === food.id);
//   if(wishfood){
//     return;
//   }
//   this.wish.items.push(new WishItem(food));
//   this.setWishlistToLocalStorage()
// }
// removeFromWish(foodid:string){
//   this.wish.items=this.wish.items.filter(item=>item.food.id !== foodid);
//   this.setWishlistToLocalStorage()
// }

// getWishObsrevable():Observable<WishList>{
//   return this.wishSubject.asObservable()
// }
// getWish()
// {
//   return this.wishSubject.value;
// }


// private setWishlistToLocalStorage():void{
//   localStorage.setItem(this.WISHLIST_KEY,JSON.stringify(this.wish));
//   this.wishSubject.next(this.wish);
// }


// private getWishListFromLocalStorage():WishList{
//   const x=localStorage.getItem(this.WISHLIST_KEY);
//   if(x)
//   {
//     return JSON.parse(x);
//   }
//   return new WishList();
// }



//BY Infant Raj.S💞
