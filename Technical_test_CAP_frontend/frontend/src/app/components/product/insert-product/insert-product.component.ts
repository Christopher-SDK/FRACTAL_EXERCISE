import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../../../model/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-insert-product',
  templateUrl: './insert-product.component.html',
  styleUrl: './insert-product.component.css'
})
export class InsertProductComponent {
  modoInsertar: boolean = true;
  customProductForm: FormGroup;
  productId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.customProductForm = this.formBuilder.group({
      productId: [''],
      name: ['', Validators.required],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.params['productId'];

    if (this.productId !== 0 && this.productId !== undefined) {
      this.modoInsertar = false;
      this.productService.getProductById(this.productId).subscribe(
        {
          next: (data: Product) => {
            this.customProductForm.patchValue({
              productId: data.productId,
              name: data.name,
              unitPrice: data.unitPrice,
              quantity: data.quantity,
            });
          },
          error: (err) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error retrieving product information',
              timer: 3000,
              showConfirmButton: false
            });
          }
        }
      );
    } else {
      this.productId = 0;
      this.modoInsertar = true;
    }
  }

  addCustomProduct(): void {
    if (this.customProductForm.valid) {
      const newProduct = this.customProductForm.value;

      const actionText = this.modoInsertar ? 'added' : 'updated';

      this.productService.createProduct(newProduct).subscribe(
        () => {
          console.log('Product ' + actionText + ' successfully');
          this.customProductForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Product ' + actionText + ' successfully',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/product']);
        },
        (error: any) => {
          console.error('Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' product', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error ' + (this.modoInsertar ? 'adding' : 'updating') + ' product',
            timer: 3000,
            showConfirmButton: false
          });

          this.router.navigate(['/product']);
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

      this.router.navigate(['/product']);
    }
  }
}
