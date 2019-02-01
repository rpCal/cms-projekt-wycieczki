import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './_modules/app-routing.module';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { TripListComponent } from './main/trip-list/trip-list.component';
import { LoginComponent } from './main/auth/login/login.component';
import { LogoutComponent } from './main/auth/logout/logout.component';
import { HttpClientModule } from '@angular/common/http';
import { BurgerComponent } from './nav/burger/burger.component';
import { MaterialModule } from './_modules/material.module';
import { TripDetailComponent } from './main/trip-detail/trip-detail.component';
import { TripAddComponent } from './main/trip-add/trip-add.component';
import { RezerwationAddComponent } from './main/trip-detail/rezerwation-add/rezerwation-add.component';
import { RezerwationUserComponent } from './main/rezerwation-user/rezerwation-user.component';
import { MarkComponent } from './main/rezerwation-user/mark/mark.component';
import { PayComponent } from './main/rezerwation-user/pay/pay.component';
import { DeleteComponent } from './main/rezerwation-user/delete/delete.component';
import { RegistrationComponent } from './main/registration/registration.component';
import { TripRatingComponent } from './main/trip-detail/trip-rating/trip-rating.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MainPageComponent,
    TripListComponent,
    LoginComponent,
    LogoutComponent,
    BurgerComponent,
    TripDetailComponent,
    TripAddComponent,
    RezerwationAddComponent,
    RezerwationUserComponent,
    MarkComponent,
    PayComponent,
    DeleteComponent,
    RegistrationComponent,
    TripRatingComponent
  ],
  entryComponents: [
    RezerwationAddComponent,
    PayComponent,
    MarkComponent,
    DeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

