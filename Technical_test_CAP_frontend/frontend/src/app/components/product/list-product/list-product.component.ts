import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../model/Product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchProduct: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products) => {
        this.products = products;
        this.filteredProducts = [...products];
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

  deleteProduct(productId: number): void {
    Swal.fire({
      icon: 'warning',
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this product?',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProduct(productId).subscribe(
          () => {
            this.products = this.products.filter((product) => product.productId !== productId);
            this.filteredProducts = this.filteredProducts.filter((product) => product.productId !== productId);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Product deleted successfully',
              timer: 3000,
              showConfirmButton: false
            });
          },
          (error) => {
            console.error('Error deleting product', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error deleting product',
              timer: 3000,
              showConfirmButton: false
            });
          }
        );
      }
    });
  }

  searchProductList(): void {
    if (this.searchProduct) {
      const searchTerm = this.searchProduct.trim().toLowerCase();
      this.filteredProducts = this.products.filter((product) => {
        return (
          product.name.toLowerCase().includes(searchTerm) ||
          product.unitPrice.toString().toLowerCase().includes(searchTerm) ||
          product.quantity.toString().toLowerCase().includes(searchTerm) ||
          (product.productId.toString().toLowerCase().includes(searchTerm) || '')
        );
      });
    } else {
      this.loadProducts();
    }
  }
}
