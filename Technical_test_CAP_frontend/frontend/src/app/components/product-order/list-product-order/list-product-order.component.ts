import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { ProductOrder } from '../../../model/ProductOrder';
import { ProductOrderService } from '../../../services/product-order.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-list-product-order',
  templateUrl: './list-product-order.component.html',
  styleUrl: './list-product-order.component.css'
})
export class ListProductOrderComponent {
  productOrders: ProductOrder[] = [];
  filteredProductOrders: ProductOrder[] = [];
  searchProductOrders: string = '';

  private initialSearchState: { searchProductOrders: string } = {
    searchProductOrders: '',
  };

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private productOrderService: ProductOrderService
  ) { }

  ngOnInit(): void {
    const userId = this.userService.getCurrentUserId();
    if (userId !== null) {
      this.loadProductOrders(userId);
    } else {
      console.error('User ID not found.');
    }
    this.saveInitialSearchState();
  }

  loadProductOrders(userId: number): void {
    this.productOrderService.listAllProductOrderByUser(userId).subscribe(
      (productOrders) => {
        this.productOrders = productOrders;
        this.filteredProductOrders = [...productOrders];
        this.searchProductOrderList();
      },
      (error) => {
        console.error('Error loading Product Orders:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error loading Product Orders',
          timer: 3000,
          showConfirmButton: false
        });
      }
    );
  }

  searchProductOrderList(): void {
    if (this.searchProductOrders) {
      const searchTerm = this.searchProductOrders.trim().toLowerCase();
      this.filteredProductOrders = this.productOrders.filter((productOrder) => {
        return (
          productOrder.idProductOrder.toString().toLowerCase().includes(searchTerm) ||
          productOrder.productId.toString().toLowerCase().includes(searchTerm) ||
          productOrder.orderId.toString().toLowerCase().includes(searchTerm) ||
          productOrder.userId.toString().toLowerCase().includes(searchTerm)
        );
      });
    }
  }

  deleteProductOrder(idProductOrder: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this Product Order?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productOrderService.deleteProductOrder(idProductOrder).subscribe(
          () => {
            this.productOrders = this.productOrders.filter((productOrder) => productOrder.idProductOrder !== idProductOrder);
            this.filteredProductOrders = this.filteredProductOrders.filter((productOrder) => productOrder.idProductOrder !== idProductOrder);
            this.snackBar.open('Product Order deleted successfully', 'Dismiss', { duration: 3000 });
          },
          (error) => {
            console.error('Error deleting Product Order', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting Product Order',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  resetSearchFields(): void {
    this.searchProductOrders = this.initialSearchState.searchProductOrders;
    this.searchProductOrderList();
  }

  private saveInitialSearchState(): void {
    this.initialSearchState.searchProductOrders = this.searchProductOrders;
  }
}
