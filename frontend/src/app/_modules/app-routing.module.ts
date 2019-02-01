import { TripRatingComponent } from './../main/trip-detail/trip-rating/trip-rating.component';
import { AuthGuard } from './../auth-guard/auth.guard';
import { TripDetailComponent } from './../main/trip-detail/trip-detail.component';
import { LoginComponent } from '../main/login/login.component';
import { TripListComponent } from '../main/trip-list/trip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from '../main/main-page/main-page.component';
import { TripAddComponent } from '../main/trip-add/trip-add.component';
import { RezerwationUserComponent } from '../main/rezerwation-user/rezerwation-user.component';
import { RegistrationComponent } from '../main/registration/registration.component';

const routes: Routes = [
  { path: '', redirectTo: "main-page", pathMatch: "full"},
  { path: "main-page", component: MainPageComponent },
  { path: "trip-list", component: TripListComponent },
  { path: "login", component: LoginComponent },
  { path: "trip-detail", component: TripDetailComponent },
  { path: "trip-add", component: TripAddComponent },
  { path: "user-reservation", component: RezerwationUserComponent },
  { path: "registration-user", component: RegistrationComponent },
  { path: "trip-rating", component: TripRatingComponent}
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ]
})
export class AppRoutingModule { }
