import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Food } from 'src/app/data/food';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{

  food:Food[]=[];

  constructor(foodService:FoodService,private router:Router,activatrout:ActivatedRoute){
    foodService.getAll().subscribe((serverfood)=>{
      this.food=serverfood;
    })

    activatrout.params.subscribe((params)=>{
      if(params.foodid)
      {
      foodService.getForDelet(params.foodid).subscribe(()=>{
        this.router.navigateByUrl("/info");
      }

      )
      }
    })
  }

  ngOnInit(): void {

  }
add(){
  this.router.navigateByUrl('/addfood');
}

}
