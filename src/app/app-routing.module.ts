import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {ProductsComponent} from "./components/products/products.component";
import {NewProductComponent} from "./components/new-product/new-product.component";
import {EditProductComponent} from "./components/edit-product/edit-product.component";
import {LoginComponent} from "./components/login/login.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {authGuard} from "./guards/auth.guard";
import {roleGuard} from "./guards/role.guard";
import {UnauthorizedComponent} from "./components/unauthorized/unauthorized.component";
import {protectRouteFromAuthorizedUsersGuard} from "./guards/protect-route-from-authorized-users.guard";
import {canDeactivateUnauthorizedGuard} from "./guards/can-deactivate-unauthorized.guard";

const routes: Routes = [
  {
    path: "", component: LayoutComponent, canActivate: [authGuard], children: [
      {path: "", redirectTo: "home", pathMatch: "full"},
      {path: "home", component: HomeComponent},
      {path: "products", component: ProductsComponent},
      {path: "new-product", component: NewProductComponent, canActivate: [roleGuard], data: {authorizedRoles: ["ADMIN"]}},
      {path: "edit-product/:id", component: EditProductComponent, canActivate: [roleGuard], data: {authorizedRoles: ["ADMIN"]}},
      {path: "unauthorized", component: UnauthorizedComponent, canDeactivate: [canDeactivateUnauthorizedGuard],
        canActivate: [protectRouteFromAuthorizedUsersGuard], data: {protectFrom: ["ADMIN"],
      }}
    ]
  },

  {path: "login", component: LoginComponent},

  {path: "**", redirectTo: "home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
