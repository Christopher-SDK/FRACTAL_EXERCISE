import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Order } from '../../../model/Order';
import { Product } from '../../../model/Product';
import { ProductOrder } from '../../../model/ProductOrder';
import { OrderService } from '../../../services/order.service';
import { ProductOrderService } from '../../../services/product-order.service';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-insert-product-order',
  templateUrl: './insert-product-order.component.html',
  styleUrl: './insert-product-order.component.css'
})
export class InsertProductOrderComponent {
  modoInsertar: boolean = true;
  customProductOrderForm: FormGroup;
  userId!: number;
  productList: Product[] = [];
  orderList: Order[] = [];
  idProductOrder!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productOrderService: ProductOrderService,
    private productService: ProductService,
    private orderService: OrderService,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customProductOrderForm = this.formBuilder.group({
      idProductOrder: [''],
      productId: [null, Validators.required],
      orderId: [null, Validators.required],
      userId: this.userService.getCurrentUserId(),
      totalAmount: [''],
    });
    this.customProductOrderForm.patchValue({
      userId: this.userService.getCurrentUserId() ?? 0
    });
  }

  ngOnInit(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId !== null) {
      this.loadProducts(userId);
      this.loadOrders(userId);
    } else {
      console.error('User ID not found.');
    }

    this.idProductOrder = this.activatedRoute.snapshot.params['idProductOrder'];

    if (this.idProductOrder !== 0 && this.idProductOrder !== undefined) {
      this.modoInsertar = false;
      this.productOrderService.getProductOrderById(this.idProductOrder).subscribe(
        {
          next: (data: ProductOrder) => {
            this.customProductOrderForm.patchValue({
              idProductOrder: data.idProductOrder,
              productId: data.productId,
              orderId: data.orderId, 
              userId: data.userId,
              totalAmount: data.totalAmount
            });
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving product order information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    }}

  loadProducts(userId: number): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.productList = products;
      },
      (error) => {
        console.error('Error loading products:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading products',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  loadOrders(userId: number): void {
    this.orderService.getAllOrdersByUser(userId).subscribe(
      (orders) => {
        this.orderList = orders;
      },
      (error) => {
        console.error('Error loading orders:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading orders',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  addCustomProductOrder(): void {
    if (this.customProductOrderForm.valid) {
      const newProductOrder = this.customProductOrderForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.productOrderService.saveProductOrder(newProductOrder).subscribe(
        () => {
          console.log('Product Order ' + actionText + ' successfully');
          this.customProductOrderForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Product Order ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/product-order']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' product order', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' product order',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/product-order']);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fill in all required fields',
        timer: 3000,
        showConfirmButton: false
      });

      this.router.navigate(['/product-order']);
    }
  }
}
