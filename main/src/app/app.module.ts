import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RatingModule } from 'ng-starrating';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { FooddtailComponent } from './Component/fooddtail/fooddtail.component';
import { SearchComponent } from './Component/search/search.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { OrderComponent } from './Component/order/order.component';
import { CartComponent } from './Component/cart/cart.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import { TagComponent } from './Component/tag/tag.component';


import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';//loding index


import { Title1Component } from './Component/title1/title1.component';
import { NotFoundComponent } from './Component/not-found/not-found.component';
import { ToastrModule } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { InputContainerComponent } from './Component/input-container/input-container.component';
import { RegisterComponent } from './Component/register/register.component';
import { InputValidationComponent } from './Component/input-validation/input-validation.component';
import { LoadingComponent } from './Component/loading/loading.component';
import { LoadingInterceptor } from './Component/interceptors/loading.interceptor';
import { CheckOutpageComponent } from './Component/check-outpage/check-outpage.component';
import { FoodComponent } from './Component/Admin/food/food.component';
import { UserComponent } from './Component/Admin/user/user.component';
import { AddFoodComponent } from './Component/Admin/add-food/add-food.component';
import { ContentComponent } from './Component/Admin/content/content.component';
import { MainComponent } from './Component/Admin/main/main.component';
import { FoodUpdateComponent } from './Component/Admin/food-update/food-update.component';
import { OrderItemListComponent } from './Component/order-item-list/order-item-list.component';
import { HeaderFildComponent } from './Component/header-fild/header-fild.component';
import { MapComponent } from './Component/map/map.component';

import { AuthGuard} from '../app/auth/guard/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PaymentComponent } from './Component/payment/payment.component';
import { PaypalComponent } from './Component/paypal/paypal.component';
import { TruckComponent } from './Component/truck/truck.component';
import { OrderUserDetailComponent } from './Component/order-user-detail/order-user-detail.component';
import { AccountVerifyComponent } from './Component/account-verify/account-verify.component';
import { AccountVerifyAlertComponent } from './Component/account-verify-alert/account-verify-alert.component';


import { ImageCropperModule } from 'ngx-image-cropper';


import { NgxCaptchaModule } from 'ngx-captcha';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { SendFeedbackComponent } from './Component/send-feedback/send-feedback.component';
import { OrderAdminComponent } from './Component/Admin/order-admin/order-admin.component';


import { DatePipe } from '@angular/common';
import { DirectionMapComponent } from './Component/Admin/direction-map/direction-map.component';
import { EmailComponent } from './Component/frogotpassword/email/email.component';
import { PasswordComponent } from './Component/frogotpassword/password/password.component';
import { FeedbackComponent } from './Component/Admin/feedback/feedback.component';
@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
    LoginComponent,
    DashboardComponent,
    FooddtailComponent,
    SearchComponent,
    ProfileComponent,
    OrderComponent,
    CartComponent,
    WishlistComponent,
    TagComponent,
    Title1Component,
    NotFoundComponent,
    InputContainerComponent,
    RegisterComponent,
    InputValidationComponent,
    LoadingComponent,
    CheckOutpageComponent,
    FoodComponent,
    UserComponent,
    AddFoodComponent,
    ContentComponent,
    MainComponent,
    FoodUpdateComponent,
    OrderItemListComponent,
    HeaderFildComponent,
    MapComponent,
    PaymentComponent,
    PaypalComponent,
    TruckComponent,
    OrderUserDetailComponent,
    AccountVerifyComponent,
    AccountVerifyAlertComponent,
    ChangePasswordComponent,
    SendFeedbackComponent,
    OrderAdminComponent,
    DirectionMapComponent,
    EmailComponent,
    PasswordComponent,
    FeedbackComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut:4000,
      positionClass:'toast-buttom-right',
      newestOnTop:false
    }),
    ImageCropperModule,
    NgxCaptchaModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },{
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    },AuthGuard,
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
