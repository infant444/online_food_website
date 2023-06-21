import { Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddFood } from 'src/app/data/addfood';
import { Food } from 'src/app/data/food';
import { FoodService } from 'src/app/services/food/food.service';

import { NgxImageCompressService } from 'ngx-image-compress';
@Component({
  selector: 'app-food-update',
  templateUrl: './food-update.component.html',
  styleUrls: ['./food-update.component.css']
})
export class FoodUpdateComponent implements OnInit {


food!:Food;
nameform!:FormGroup;
imageform!:FormGroup;
tagform!:FormGroup;
ratingform!:FormGroup;
orginsform!:FormGroup;
priceform!:FormGroup;


isSubmitted1=false;
isSubmitted2=false;
isSubmitted3=false;
isSubmitted4=false;
isSubmitted5=false;
isSubmitted6=false;

  returnUrl='';
  foodimg!:File;
  foodimgpath:string='';
  basecode64!:string;
  name:string='';
  constructor(private activateRouter:ActivatedRoute,private foodservice:FoodService,private formbilder:FormBuilder,private router:Router,private imageCompressService: NgxImageCompressService){

  }
  ngOnInit(): void {
    this.activateRouter.params.subscribe((params)=>{
      if(params.updateid){
      this.foodservice.getFoodById(params.updateid).subscribe((foodserver)=>{
          this.food=foodserver;
        });
      }
    })
    // var {name,imageurl}=this.food;

    this.nameform=this.formbilder.group({
      name:['',[Validators.required]]
    })


    this.imageform=this.formbilder.group({
      imageurl:['',Validators.required]
    })

    this.tagform=this.formbilder.group({
      tags:['',Validators.required]
    })

    this.ratingform=this.formbilder.group({
      rating:['',Validators.required]
    })
    this.orginsform=this.formbilder.group({
      orgins:['',Validators.required]
    })
    this.priceform=this.formbilder.group({
      price:['',Validators.required]
    })


  this.returnUrl=this.activateRouter.snapshot.queryParams.returnUrl;

  }

  get Fc1(){
    return this.nameform.controls;
  }
  get Fc2(){
    return this.imageform.controls;
  }
  get Fc3(){
    return this.tagform.controls;
  }
  get Fc4(){
    return this.ratingform.controls;
  }
  get Fc5(){
    return this.orginsform.controls;
  }
  get Fc6(){
    return this.priceform.controls;
  }




  submit1(){
    this.isSubmitted1=true;
    if(this.nameform.invalid)
    {
      return;
    }
    const fv=this.nameform.value;
    const add_food:AddFood={
      name:fv.name,
      imageurl:'',
      rating:0,
      orgins:[],
      tag:[],
      price:0,
    }

    this.foodservice.getFoodForUpdateByName(this.food.id,add_food).subscribe(_=>{
      window.location.reload();
    }

    );

  }
  onFileSelected(event: any) {
    this.foodimg = event.target.files[0];

    this.foodimgpath=this.Fc2.imageurl.value;
    const reader=new FileReader();
      reader.readAsDataURL(this.foodimg);
      reader.onload=()=>{
        this.basecode64=reader.result as string;
        console.log(this.basecode64);


      };
      reader.onerror=(error)=>{
        console.log("error ouccor",error);
      };
  }








  submit2(){
    this.isSubmitted2=true;
    if(this.imageform.invalid)
    {
      return;
    }
    const add_food:AddFood={
      name:'',
      imageurl:this.basecode64,
      rating:0,
      orgins:[],
      tag:[],
      price:0,
    }

    this.foodservice.getFoodForUpdateByImage(this.food.id,add_food).subscribe(_=>{
      window.location.reload();
    }

    );
  }



  submit3(){
    this.isSubmitted3=true;
    if(this.tagform.invalid)
    {
      return;
    }
    const fv=this.tagform.value;
    const add_food:AddFood={
      name:'',
      imageurl:'',
      rating:0,
      orgins:[],
      tag:fv.tag.split(','),
      price:0,
    }

    this.foodservice.getFoodForUpdateByTag(this.food.id,add_food).subscribe(_=>{
      window.location.reload();
    }
    );

  }

  submit4(){
    this.isSubmitted4=true;
    if(this.ratingform.invalid)
    {
      return;
    }
    const fv=this.ratingform.value;
    const add_food:AddFood={
      name:fv.name,
      imageurl:'',
      rating:parseFloat(fv.rating),
      orgins:[],
      tag:[],
      price:0,
    }

    this.foodservice.getFoodForUpdateByRating(this.food.id,add_food).subscribe(_=>{
      window.location.reload();
    }
    );

  }

  submit5(){
    this.isSubmitted5=true;
    if(this.orginsform.invalid)
    {
      return;
    }
    const fv=this.orginsform.value;
    const add_food:AddFood={
      name:fv.name,
      imageurl:'',
      rating:0,
      orgins:fv.orgins.split(','),
      tag:[],
      price:0,
    }

    this.foodservice.getFoodForUpdateByOrgins(this.food.id,add_food).subscribe(_=>{
      window.location.reload();
    }
    );

  }

  submit6(){
    this.isSubmitted6=true;
    if(this.priceform.invalid)
    {
      return;
    }
    const fv=this.priceform.value;
    const add_food:AddFood={
      name:fv.name,
      imageurl:'',
      rating:0,
      orgins:[],
      tag:[],
      price:fv.price,
    }
    this.foodservice.getFoodForUpdateByPrice(this.food.id,add_food).subscribe(_=>{
      window.location.reload();
    }
    );
  }
}
