import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import 'hammerjs'
import { DomSanitizer } from '@angular/platform-browser';
import { userPhoto } from 'src/app/data/login/userupload';
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/data/login/userinfo';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: FormGroup;
  isSubmitted = false;
  selectedFile!: File;
  profilephoto!:userPhoto;
  croppedImage: any = '';
  basecode64!: string;
  user!:User;
  foodimgpath!:string;
  constructor(private formbilder: FormBuilder,private rout:Router,private loginservice:LoginService) {

  }
  ngOnInit(): void {

    this.loginservice.userObeservable.subscribe((user)=>{
      this.user=user;
    })
    this.profile = this.formbilder.group({
      image: (['',]),
      name: ([this.user.name,]),
      email:([this.user.email,]),
      address:([this.user.address,]),
      Phoneno:([this.user.phono,]),
    });
  }
  get Fc() {
    return this.profile.controls;
  }
  onFileSelected(event: any) {
    this.foodimgpath=this.Fc.image.value;
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          console.log(canvas)
          const ctx = canvas.getContext('2d')!;
          canvas.width = 200;
          canvas.height = 200;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          this.croppedImage = canvas.toDataURL();


        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
      this.basecode64= this.croppedImage;
      console.log( this.basecode64);
    }
  }






  submit() {
    this.isSubmitted = true;
    if (this.profile.invalid && !this.selectedFile) {
      console.log("error");
      return;
    }
    const Fv=this.profile.value;
    const  photo:any={
      photo: this.croppedImage,
      email:Fv.email,
      name:Fv.name,
      address:Fv.address,
      phono:Fv.Phoneno,
    }
    console.log(photo);
    this.loginservice.uploadphoto(photo,this.user.id.toString()).subscribe((photo)=>{



    })
  }
}


// if (this.croppedImage) {
//   const reader = new FileReader();
//   reader.onload = () => {
//     this.base64Image = reader.result as string;
//   };
//    reader.readAsDataURL(this.croppedImage);
// }




// if (this.selectedFile) {
//   const reader = new FileReader();
//   reader.onload = (event: any) => {
//     const img = new Image();
//     img.onload = () => {
//       const canvas = document.createElement('canvas');
//       console.log(canvas)
//       const ctx = canvas.getContext('2d')!;
//       canvas.width = 200; // Set your desired width
//       canvas.height = 200; // Set your desired height
//       ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//       this.croppedImage = canvas.toDataURL();
//     };
//     img.src = event.target.result;
//   };
//   reader.readAsDataURL(this.selectedFile);
// }
// this.basecode64= this.croppedImage;



















  // const reader=new FileReader();
      // reader.readAsDataURL(this.selectedFile);
      // reader.onload=()=>{
      //   this.basecode64=reader.result as string;
      //   console.log(this.basecode64);
      // };
      // reader.onerror=(error)=>{
      //   console.log("error ouccor",error);
      // };
