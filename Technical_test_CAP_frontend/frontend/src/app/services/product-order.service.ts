import { ProductOrder } from './../model/ProductOrder';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {

  private url = "http://localhost:8080/api/productorders";

  constructor(private http: HttpClient) {}

  saveProductOrder(productOrder: ProductOrder): Observable<ProductOrder> {
    return this.http.post<ProductOrder>(this.url, productOrder);
  }

  listAllProductOrderByUser(idUser: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.url}/user/${idUser}`);
  }

  getProductOrderById(id: number): Observable<ProductOrder> {
    return this.http.get<ProductOrder>(`${this.url}/${id}`);
  }

  deleteProductOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  updateProductOrder(id: number, ProductOrder: ProductOrder): Observable<ProductOrder> {
    return this.http.put<ProductOrder>(`${this.url}/${id}`, ProductOrder);
  }

}
