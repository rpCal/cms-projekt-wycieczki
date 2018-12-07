import { FakeBackendInterceptor } from './mocks/fake.backend';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import { TripListComponent } from './main/trip-list/trip-list.component';
import { ContactComponent } from './main/contact/contact.component';
import { LoginComponent } from './main/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
    ContactComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    //disconnet when real api
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }

