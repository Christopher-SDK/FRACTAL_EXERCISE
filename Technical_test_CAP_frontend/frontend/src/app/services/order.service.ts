import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../model/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = "http://localhost:8080/api/orders";

  constructor(private http: HttpClient) {}

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(this.url, order);
  }

  getAllOrdersByUser(idUser: number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/user/${idUser}`);
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.url}/${id}`);
  }

  updateOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.url}/${id}`, order);
  }

  deleteOrder(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  findAllByNumberOrder(numberOrder: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.url}/number/${numberOrder}`);
  }
}
