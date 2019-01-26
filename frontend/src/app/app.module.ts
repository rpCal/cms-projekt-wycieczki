import { FakeBackendInterceptor } from './mocks/fake.backend';
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
import { LoginComponent } from './main/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BurgerComponent } from './nav/burger/burger.component';
import { LastMinuteComponent } from './main/last-minute/last-minute.component';
import { MaterialModule } from './_modules/material.module';
import { TripDetailComponent } from './main/trip-detail/trip-detail.component';

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    MainPageComponent,
    TripListComponent,
    LoginComponent,
    BurgerComponent,
    LastMinuteComponent,
    TripDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    //disconnet when real api
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }

