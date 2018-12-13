import { AuthGuard } from './auth-guard/auth.guard';
import { LoginComponent } from './main/login/login.component';
import { TripListComponent } from './main/trip-list/trip-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main/main-page/main-page.component';
import { LastMinuteComponent } from './main/last-minute/last-minute.component';

const routes: Routes = [
  { path: '', redirectTo: "main-page", pathMatch: "full"},
  { path: "main-page", component: MainPageComponent },
  { path: "trip-list", component: TripListComponent },
  { path: "last-minute", component: LastMinuteComponent,  canActivate: [AuthGuard] },
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
