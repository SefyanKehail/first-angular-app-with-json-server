import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NewProductComponent } from './components/new-product/new-product.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import {SharedSpinnerInterceptor} from "./interceptors/shared-spinner.interceptor";
import { LoginComponent } from './components/login/login.component';
import { ToastComponent } from './components/toast/toast.component';
import { LayoutComponent } from './components/layout/layout.component';
import {ToastableErrorInterceptor} from "./interceptors/toastable-error.interceptor";
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    NewProductComponent,
    EditProductComponent,
    DashboardComponent,
    HeaderComponent,
    LoginComponent,
    ToastComponent,
    LayoutComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ToastableErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: SharedSpinnerInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
