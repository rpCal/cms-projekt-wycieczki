import { AuthGuard } from './auth-guard/auth.guard';
import { LoginComponent } from './main/login/login.component';
import { TripListComponent } from './main/trip-list/trip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { ContactComponent } from './main/contact/contact.component';

const routes: Routes = [
  { path: "main-page", component: MainPageComponent },
  { path: "trip-list", component: TripListComponent, },
  { path: "contact", component: ContactComponent,  canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent }
]

@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
