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
import { ProfileComponent } from './Components/user-settings/profile/profile.component';
import { NumberToArrayPipe } from './Pipes/number-to-array.pipe';
import { CarouselComponent } from './Components/carousel/carousel.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { OrderHistoryComponent } from './Components/user-settings/order-history/order-history.component';

import { NgToastModule } from 'ng-angular-popup';
import { UserSettingsComponent } from './Components/user-settings/user-settings.component';
import { ReviewDialogComponent } from './Components/single-product/review-dialog/review-dialog.component';

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
    CarouselComponent,
    OrderHistoryComponent,
    UserSettingsComponent,
    ReviewDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgToastModule
  ],
  providers: [
    CookieService,
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
