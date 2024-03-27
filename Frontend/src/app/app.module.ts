import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HeaderComponent } from './Components/header/header.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { ProductsComponent } from './Components/products/products.component';
import { SingleProductComponent } from './Components/single-product/single-product.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { FeedbackComponent } from './Components/feedback/feedback.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { NumberToArrayPipe } from './Pipes/number-to-array.pipe';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    SingleProductComponent,
    CartComponent,
    WishlistComponent,
    FeedbackComponent,
    NotFoundComponent,
    ProfileComponent,
    NumberToArrayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
  ],
  providers: [
    CookieService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
