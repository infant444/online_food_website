import { Component,OnInit} from '@angular/core';
import { Food } from 'src/app/data/food';
import { FoodService } from 'src/app/services/food/food.service';
import { ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';
import { FavFood } from 'src/app/data/favfood';
import { WishModel } from 'src/app/data/wishlist/wishmodel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  food:Food[]=[];
  fav:WishModel[]=[];
constructor(private foodservice:FoodService,activatedrout:ActivatedRoute){
  var foodObservable: Observable<Food[]>;
  activatedrout.params.subscribe((params)=>{
    if(params.searchterm){
      foodObservable=this.foodservice.getAllBySearch(params.searchterm);
    }
    else if(params.tagterm){
      foodObservable=this.foodservice.getAllBYTag(params.tagterm)
    }
    else{
      foodObservable=this.foodservice.getAll();
      // this.foodservice.getAllFavroit().subscribe((favser)=>{
      //   this.fav=favser;
      //   console.log(this.fav);
      // })

    }
    foodObservable.subscribe((serverfood)=>{
      this.food=serverfood;
    })

  })
  // if(this.fav){
  //   for(var i=0;i<this.food.length;i++){
  //     for(var j=0;j<this.fav.length;i++)
  //     {
  //       if(this.food[i].id===this.fav[j].food){
  //         this.food[i].favirote=this.fav[j].favirote;
  //       }
  //     }
  //   }
  //   console.log(this.food);
  // }
}
ngOnInit(): void {

}




}
