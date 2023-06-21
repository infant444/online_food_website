import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFood } from 'src/app/data/addfood';
import { Food } from 'src/app/data/food';
import { FoodService } from 'src/app/services/food/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit {

foodForm!:FormGroup;
isSubmitted=false;
  returnUrl='';
  foodimg!:File;
  foodimgpath:string='';
  basecode64!:string;
  name:string='';
  constructor(private activateRouter:ActivatedRoute,private foodservice:FoodService,private formbilder:FormBuilder, private router:Router){

  }
  ngOnInit(): void {
    this.foodForm=this.formbilder.group({
      name:['',[Validators.required]],
      imageurl:['',[Validators.required]],
      tags:['',[Validators.required]],
      rating:['',[Validators.required]],
      orgins:['',[Validators.required]],
      price:['',[Validators.required]]
    })
  }
  get Fc(){
    return this.foodForm.controls;
  }
  onFileSelected(event: any) {
    this.foodimg = event.target.files[0];
    this.foodimgpath=this.Fc.imageurl.value;
    const reader=new FileReader();
      reader.readAsDataURL(this.foodimg);
      reader.onload=()=>{
        this.basecode64=reader.result as string;
        // console.log(this.basecode64);
      };
      reader.onerror=(error)=>{
        console.log("error ouccor",error);
      };
  }

  submit(){
    this.isSubmitted=true;
    if(this.foodForm.invalid){
      console.log(this.foodForm.invalid);
      return;
    }

    const fv=this.foodForm.value;

    const add_food:AddFood={
      name:fv.name,
      imageurl: this.basecode64,
      rating:parseFloat(fv.rating),
      orgins:fv.orgins.split(','),
      tag:fv.tags.split(','),
      price:parseFloat(fv.price),
    }
    console.log(add_food);

    this.foodservice.getFoodToAdd(add_food).subscribe(_=>{
      this.router.navigateByUrl('/info');
    })
  }
}
