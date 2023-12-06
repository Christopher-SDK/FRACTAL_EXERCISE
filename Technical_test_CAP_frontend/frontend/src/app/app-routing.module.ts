import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ProductComponent } from './components/product/product.component';
import { NavAllInsertProductComponent } from './components/product/nav-all-insert-product/nav-all-insert-product.component';
import { OrderComponent } from './components/order/order.component';
import { NavAllInsertOrderComponent } from './components/order/nav-all-insert-order/nav-all-insert-order.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';
import { NavAllInsertProductOrderComponent } from './components/product-order/nav-all-insert-product-order/nav-all-insert-product-order.component';

const routes: Routes = [
  { path: 'home', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'product', component: ProductComponent },
  { path: 'create-product', component: NavAllInsertProductComponent },
  { path: 'editNo/:productId', component: NavAllInsertProductComponent },

  { path: 'order', component: OrderComponent },
  { path: 'create-order', component: NavAllInsertOrderComponent },
  { path: 'editOr/:orderId', component: NavAllInsertOrderComponent },

  { path: 'product-order', component: ProductOrderComponent },
  { path: 'create-product-order', component: NavAllInsertProductOrderComponent },
  { path: 'editPrOr/:idProductOrder', component: NavAllInsertProductOrderComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
