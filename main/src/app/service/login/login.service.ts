import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DELETE_USER_FEEDBACK, EMAIL_CHECK_URL, FILTER_FEEDBACK, FORGOT_PASSWORD_MAIL_URL, FORGOT_PASSWORD_URL, LOGIN_BACKGROUND, LOGIN_URL, OTP_URL, REGISTER, SEE_FEEDBACK, SEE_USER_FEEDBACK, SEND_FEEDBACK, USER_CHANGE_PASSWORD, USER_DELETE, USER_DETAIL, USER_PHOTO, USER_UPLOAD_PHOTO, USER_VERIFY } from 'src/app/data/constent/urls';
import { Feedback } from 'src/app/data/feedback/feedback';
import { Food } from 'src/app/data/food';
import { IUserLogin } from 'src/app/data/login/Iuserlogin';
import { Pass } from 'src/app/data/login/changepassword';
import { Email_OTP } from 'src/app/data/login/email';
import { Register } from 'src/app/data/login/register';
import { User } from 'src/app/data/login/userinfo';
import { userPhoto } from 'src/app/data/login/userupload';
const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject = new BehaviorSubject<User>(this.getUserLocalStorage());
  public userObeservable: Observable<User>;



  constructor(private http: HttpClient,
    private toastrservice: ToastrService,
    private router:Router) {
    this.userObeservable = this.userSubject.asObservable();
  }




  login(userlogin: IUserLogin): Observable<User> {
    return this.http.post<User>(LOGIN_URL, userlogin).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrservice.success(`Welcome to Food Delar ${user.name} !`,'Login Successfully');
          console.log(user.token);
          this.setUserToLocalStorage(user);
        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error, 'Login Failes')
        }

      })

    );
  }



  public get currentUser():User{
    return this.userSubject.value;
  }



  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  logout1() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
  }

  register(userRegister: Register): Observable<User> {
    return this.http.post<User>(REGISTER, userRegister).pipe(
      tap({
        next: (user) => {
          this.userSubject.next(user);
          this.toastrservice.success(`Welcome to Food Delar ${user.name} !`,'Regisrer Successfully')

          this.setUserToLocalStorage(user);
        },
        error: (errorResponse) => {
          this.toastrservice.error(errorResponse.error, 'Register Failes')
        }
      })
    );
  }

  // checkemail(email:string){
  //   return this.http.post(EMAIL_CHECK_URL,email);
  // }

  OtpMail(x:Email_OTP){
    return this.http.post(OTP_URL,x);
  }

  userDetail():Observable<User[]>{
    return this.http.get<User[]>(USER_DETAIL);
  }

  deleteUser(x:string):Observable<User>{
    return this.http.delete<User>(USER_DELETE+x);
  }

  Verifyuser(token:string,email:Email_OTP):Observable<User>{
    return this.http.post<User>(USER_VERIFY+token,email);
  }


  uploadphoto(photo:userPhoto,x:string):Observable<User>{
    return this.http.post<User>(USER_UPLOAD_PHOTO+x,photo).pipe(
      tap({
        next:(user)=>{
          this.userSubject.next(new User());
          localStorage.removeItem(USER_KEY);
          window.location.reload();
          this.userSubject.next(user);
          console.log(user)
          this.toastrservice.success('','Update Successfully');
          this.setUserToLocalStorage(user);
        },
        error:(errorresponse)=>{
          this.toastrservice.error(errorresponse.error, 'Update Failes')

        }
      })
    );
  }

forgotpassword(x:string,change:Pass){
  return this.http.post(FORGOT_PASSWORD_URL+x,change);
}

changepassword(x:string,change:Pass):Observable<User>{
  return this.http.post<User>(USER_CHANGE_PASSWORD+x,change);
}


sendfeedback(x:Feedback){
  console.log(x);
  return this.http.post(SEND_FEEDBACK,x);
}

forgotpasswordemailsend(x:Email_OTP){
  return this.http.post(FORGOT_PASSWORD_MAIL_URL,x);
}

seefeedback():Observable<Feedback[]>{
  return this.http.get<Feedback[]>(SEE_FEEDBACK);
}
filterfeedback(date:any):Observable<Feedback[]>{
  return this.http.post<Feedback[]>(FILTER_FEEDBACK,date);
}
seefeedbacksender(id:string):Observable<User[]>{
return this.http.get<User[]>(SEE_USER_FEEDBACK+id);
}
deletefeedback(id:string){
  return this.http.delete(DELETE_USER_FEEDBACK+id);
}


  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }



  private getUserLocalStorage(): User {
    const x = localStorage.getItem(USER_KEY);
    if (x) {
      return JSON.parse(x);
    }
    else {
      return new User();
    }
  }

  getback():Observable<Food[]>{
    return this.http.get<Food[]>(LOGIN_BACKGROUND);
  }

}
