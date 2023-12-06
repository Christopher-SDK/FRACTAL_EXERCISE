import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule} from '@angular/material/core'
import { MatPaginatorModule} from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule} from '@angular/material/icon'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule} from '@angular/material/dialog';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { MatSelectModule } from '@angular/material/select';
import Swal from 'sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './components/product/product.component';
import { InsertProductComponent } from './components/product/insert-product/insert-product.component';
import { ListProductComponent } from './components/product/list-product/list-product.component';
import { NavAllInsertProductComponent } from './components/product/nav-all-insert-product/nav-all-insert-product.component';
import { OrderComponent } from './components/order/order.component';
import { InsertOrderComponent } from './components/order/insert-order/insert-order.component';
import { ListOrderComponent } from './components/order/list-order/list-order.component';
import { NavAllInsertOrderComponent } from './components/order/nav-all-insert-order/nav-all-insert-order.component';
import { ProductOrderComponent } from './components/product-order/product-order.component';
import { ListProductOrderComponent } from './components/product-order/list-product-order/list-product-order.component';
import { NavAllInsertProductOrderComponent } from './components/product-order/nav-all-insert-product-order/nav-all-insert-product-order.component';
import { InsertProductOrderComponent } from './components/product-order/insert-product-order/insert-product-order.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    InsertProductComponent,
    ListProductComponent,
    NavAllInsertProductComponent,
    OrderComponent,
    InsertOrderComponent,
    ListOrderComponent,
    NavAllInsertOrderComponent,
    ProductOrderComponent,
    ListProductOrderComponent,
    NavAllInsertProductOrderComponent,
    InsertProductOrderComponent
  ],
  imports: [
    MatInputModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true
    },
    {
      provide: 'SweetAlertToken',
      useValue: Swal,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
