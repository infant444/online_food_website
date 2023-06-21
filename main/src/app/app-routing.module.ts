import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';
import { FooddtailComponent } from './Component/fooddtail/fooddtail.component';
import { OrderComponent } from './Component/order/order.component';
import { ProfileComponent } from './Component/profile/profile.component';
import { CartComponent } from './Component/cart/cart.component';
import { WishlistComponent } from './Component/wishlist/wishlist.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { RegisterComponent } from './Component/register/register.component';
import { CheckOutpageComponent } from './Component/check-outpage/check-outpage.component';
import { FoodComponent } from './Component/Admin/food/food.component';
import { MainComponent } from './Component/Admin/main/main.component';
import { UserComponent } from './Component/Admin/user/user.component';
import { FoodUpdateComponent } from './Component/Admin/food-update/food-update.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { PaymentComponent } from './Component/payment/payment.component';
import { TruckComponent } from './Component/truck/truck.component';
import { AccountVerifyComponent } from './Component/account-verify/account-verify.component';
import { ChangePasswordComponent } from './Component/change-password/change-password.component';
import { OrderAdminComponent } from './Component/Admin/order-admin/order-admin.component';
import { EmailComponent } from './Component/frogotpassword/email/email.component';
import { PasswordComponent } from './Component/frogotpassword/password/password.component';
import { SendFeedbackComponent } from './Component/send-feedback/send-feedback.component';
import { FeedbackComponent } from './Component/Admin/feedback/feedback.component';
import { Path } from 'leaflet';


const routes: Routes = [
  { path: "", component: HomeComponent,canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "fooddetail/:id", component: FooddtailComponent,canActivate: [AuthGuard]},
  { path: "search/:searchterm", component: HomeComponent ,canActivate: [AuthGuard]},
  { path: "tag/:tagterm", component: HomeComponent,canActivate: [AuthGuard] },
  { path: "order", component: OrderComponent,canActivate: [AuthGuard]},
  { path: "profile", component: ProfileComponent , canActivate: [AuthGuard] },
  { path: "cart", component: CartComponent,canActivate: [AuthGuard] },
  { path: "wishlist", component: WishlistComponent ,canActivate: [AuthGuard] },
  { path: "dashbord", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "register", component: RegisterComponent },
  { path: "checkout", component: CheckOutpageComponent, canActivate: [AuthGuard]  },
  { path: "info", component: MainComponent },
  { path: "fooddelete/:foodid", component: MainComponent,canActivate: [AuthGuard] },
  { path: "user", component: UserComponent,canActivate: [AuthGuard] },
  { path: "user/:userid", component: UserComponent,canActivate: [AuthGuard] },

  { path: "deleteuser/:userid", component: UserComponent },
  { path: "deleteuser/profile/:userid", component: DashboardComponent },

  { path: "addfood", component: FoodComponent },
  { path: "payment", component: PaymentComponent },
  {path:"foodupdate/:updateid",component:FoodUpdateComponent},
  { path: "track/:Orderid", component: TruckComponent,canActivate: [AuthGuard]},
  {path:"email/verify/:token",component:AccountVerifyComponent},

  {path:"user/profile/changepassword/:userid",component:ChangePasswordComponent},
  {path:"admin/order",component:OrderAdminComponent},
  {path:"user/forgot/password/email",component:EmailComponent},
  {path:"user/forgot/password/:token",component:PasswordComponent},
  {path:"user/feedback/:userid",component:SendFeedbackComponent},
  {path:"user/admin/feedback",component:FeedbackComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
