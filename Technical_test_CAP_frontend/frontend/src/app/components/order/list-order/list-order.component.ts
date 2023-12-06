import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { Order } from '../../../model/Order';
import { OrderService } from '../../../services/order.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrl: './list-order.component.css'
})
export class ListOrderComponent {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  searchOrder: string = '';
  

  constructor(private orderService: OrderService, private snackBar: MatSnackBar, private userService: UserService) {}

  ngOnInit(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId !== null) {
      this.loadOrders(userId);
    } else {
      console.error('User ID not found.');
    }


  }

  loadOrders(userId: number): void {
    this.orderService.getAllOrdersByUser(userId).subscribe(
      (orders) => {
        this.orders = orders;
        this.filteredOrders = [...orders];
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

  deleteOrder(orderId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this order?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.deleteOrder(orderId).subscribe(
          () => {
            this.orders = this.orders.filter((order) => order.orderId !== orderId);
            this.filteredOrders = this.filteredOrders.filter((order) => order.orderId !== orderId);
            this.snackBar.open('Order deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting order', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting order',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchOrderList(): void {
    if (this.searchOrder) {
      const searchTerm = this.searchOrder.trim().toLowerCase();
      this.filteredOrders = this.orders.filter((order) => {
        return (
          order.orderNumber.toLowerCase().includes(searchTerm) ||
          order.orderId.toString().toLowerCase().includes(searchTerm) ||
          order.status.toLowerCase().includes(searchTerm) ||
          (order.userId.toString().toLowerCase().includes(searchTerm) || '')
        );
      });
    } else {
      const userId = this.userService.getCurrentUserId();
      if (userId !== null) {
        this.loadOrders(userId);
      } else {
        console.error('User ID not found.');
      }
    }
  }
}
