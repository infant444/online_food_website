import { AbstractControl } from "@angular/forms"


export const passwordsMatchValidator=(passwordComtrolName:string,
  confirmPasswordControlName:string)=>{
  const Validator=(form: AbstractControl)=>{
    const passwordComtrol=form.get(passwordComtrolName);
    const confirmPasswordControl=form.get(confirmPasswordControlName);
    if(!passwordComtrol || !confirmPasswordControl)
    return;

    if(passwordComtrol.value != confirmPasswordControl.value)
    {
      confirmPasswordControl.setErrors({notMatch: true});
    }
    else{
      const errors=confirmPasswordControl.errors;
      if(!errors)return;

      delete errors.notMatch;
      confirmPasswordControl.setErrors(errors);
    }


  }
  console.log(Validator);
  return Validator;
}
