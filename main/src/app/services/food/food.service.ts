import { Injectable } from '@angular/core';
import { Food } from 'src/app/data/food';
import { sampleTag, samplefood } from 'src/app/data/data';
import { Tag } from 'src/app/data/tag';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { FOODTAG_URL, FOOD_ADD_URL, FOOD_DELETE_URL, FOOD_DETAIL_URL, FOOD_SEARCH_URL, FOOD_TAG_URL, FOOD_UPDATE_FAVIROTE_URL, FOOD_UPDATE_IMAGE_URL, FOOD_UPDATE_NAME_URL, FOOD_UPDATE_ORGIN_URL, FOOD_UPDATE_PRICE_URL, FOOD_UPDATE_RATING_URL, FOOD_UPDATE_TAG_URL, FOOD_URL, FOOD_FAV_URL } from 'src/app/data/constent/urls';
import { Router } from '@angular/router';
import { AddFood } from 'src/app/data/addfood';
import { ToastrService } from 'ngx-toastr';
import { FavFood } from 'src/app/data/favfood';
import { WishModel } from 'src/app/data/wishlist/wishmodel';
@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient,private router:Router,private toastrservice:ToastrService) { }
  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_URL);
  }
  getAllBySearch(x:string):Observable<Food[]>{
    return this.http.get<Food[]>(FOOD_SEARCH_URL+x);
  }
  getAllTag():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODTAG_URL);
  }
  getAllBYTag(x:string):Observable<Food[]>{
    return x==="All"?
    this.getAll():
    this.http.get<Food[]>(FOOD_TAG_URL +x);
  }
  getFoodById(x:number):Observable<Food>{
    return this.http.get<Food>(FOOD_DETAIL_URL+x);
  }

  getForDelet(x:string):Observable<Food>{
    console.log(x);
    return this.http.delete<Food>(FOOD_DELETE_URL+x);
  }


  // getAllFavroit():Observable<WishModel[]>{
  //   return this.http.get<WishModel[]>(FOOD_FAV_URL);
  // }
  getFoodForUpdateByName(x:string,s:AddFood):Observable<Food>
  {
    console.log(x);
    console.log(s);
    return this.http.put<Food>(FOOD_UPDATE_NAME_URL+x,s);
  }

  getFoodForUpdateByImage(x:string,s:AddFood):Observable<Food>
  {
    console.log(x);
    console.log(s);
    return this.http.put<Food>(FOOD_UPDATE_IMAGE_URL+x,s);
  }

  getFoodForUpdateByTag(x:string,s:AddFood):Observable<Food>
  {
    console.log(x);
    console.log(s);
    return this.http.put<Food>(FOOD_UPDATE_TAG_URL+x,s);
  }

  getFoodForUpdateByRating(x:string,s:AddFood):Observable<Food>
  {
    console.log(x);
    console.log(s);
    return this.http.put<Food>(FOOD_UPDATE_RATING_URL+x,s);
  }
  getFoodForUpdateByOrgins(x:string,s:AddFood):Observable<Food>
  {
    console.log(x);
    console.log(s);
    return this.http.put<Food>(FOOD_UPDATE_ORGIN_URL+x,s);
  }

  getFoodForUpdateByPrice(x:string,s:AddFood):Observable<Food>
  {
    console.log(x);
    console.log(s);
    return this.http.put<Food>(FOOD_UPDATE_PRICE_URL+x,s);
  }

  getFoodForUpdateByFavirote(x:string,favirote:FavFood):Observable<Food>
  {
    console.log(x);
    console.log(favirote);
    return this.http.put<Food>(FOOD_UPDATE_FAVIROTE_URL+x,favirote);
  }

  getFoodToAdd(addfood:AddFood):Observable<Food>{
    return this.http.post<Food>(FOOD_ADD_URL,addfood).pipe(
      tap({
        next:(Food)=>{
          this.toastrservice.success('Sucessfully Added');
        },
        error:(errorResponse)=>{
          this.toastrservice.error(errorResponse.error,'Adding a food is failed')
        }

      })
    );
  }


}





// .pipe(
//   tap({
//    next:()=>{
//      window.location.reload();
//    }
//   }

//   )

//    )
