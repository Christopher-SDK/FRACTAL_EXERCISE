import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Order } from '../../../model/Order';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-insert-order',
  templateUrl: './insert-order.component.html',
  styleUrl: './insert-order.component.css'
})
export class InsertOrderComponent {
  modoInsertar: boolean = true;
  customOrderForm: FormGroup;
  userId!: number;
  orderId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customOrderForm = this.formBuilder.group({
      orderId: [''],
      orderNumber: ['', Validators.required],
      orderDate: ['', Validators.required],
      numOfProducts: ['', Validators.required],
      status: ['', Validators.required],
      userId: this.userService.getCurrentUserId(),
    });
    this.customOrderForm.patchValue({
      userId: this.userService.getCurrentUserId() ?? 0
    });
  }

  ngOnInit(): void {
    this.userId = this.userService.getCurrentUserId() ?? 0;

    this.orderId = this.activatedRoute.snapshot.params['orderId'];

    if (this.orderId !== 0 && this.orderId !== undefined) {
      this.modoInsertar = false;
      this.orderService.getOrderById(this.orderId).subscribe(
        {
          next: (data: Order) => {
            this.customOrderForm.get('orderId')?.setValue(data.orderId);
            this.customOrderForm.get('orderNumber')?.setValue(data.orderNumber);
            this.customOrderForm.get('orderDate')?.setValue(data.orderDate);
            this.customOrderForm.get('numOfProducts')?.setValue(data.numOfProducts);
            this.customOrderForm.get('status')?.setValue(data.status);
            this.customOrderForm.get('userId')?.setValue(data.userId);
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving order information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.orderId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomOrder(): void {
    if (this.customOrderForm.valid) {
      const newOrder = this.customOrderForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.orderService.createOrder(newOrder).subscribe(
        () => {
          console.log('Order ' + actionText + ' successfully');
          this.customOrderForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Order ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/order']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' order', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' order',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/order']);
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

      this.router.navigate(['/order']);
    }
  }
}
