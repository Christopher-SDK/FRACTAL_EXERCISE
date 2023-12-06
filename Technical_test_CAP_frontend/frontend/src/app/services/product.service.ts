import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:8080/api/products";

  constructor(private http: HttpClient) {}

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}/${id}`);
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.url}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findAllByOrder_NumberOrderByUser(numberOrder: string, idUser: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}/product/${numberOrder}/${idUser}`);
  }

  assignOrder(idProduct: number, idOrder: number): Observable<void> {
    return this.http.post<void>(`${this.url}/assignOrder/${idProduct}/${idOrder}`, {});
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.url}`);
  }
}
