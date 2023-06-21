import { Component,OnInit,Input, OnChanges, SimpleChanges} from '@angular/core';
import { AbstractControl } from '@angular/forms';

const Validators_Message:any={
  required:'Shoud not be empty',
  minlength:'Field is too short',
  maxlength:'Field is too long',
  email:'email is not valid',
  notMatch:'Password and Confirm Password should be Same'
}

@Component({
  selector: 'app-input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit,OnChanges {

@Input()
control!:AbstractControl;

@Input()
showErrorsWhen:boolean=true;
errorMessages:string[]=[];


  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
   this.checkValidation();
  }
  ngOnInit(): void {
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    });
  }


  checkValidation(){
    const errors=this.control.errors;
    if(!errors){
      this.errorMessages=[];
      return;
    }

    const errorKey=Object.keys(errors);
    this.errorMessages=errorKey.map(Key=>Validators_Message[Key]);
  }
}
