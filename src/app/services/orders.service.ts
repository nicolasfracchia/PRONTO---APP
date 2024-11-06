import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderStatus } from '../interfaces/order-status';
import { environment } from 'src/environments/environment';
import { NewOrder } from '../interfaces/new-order';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor( private http: HttpClient ) { }

  // ORDERS
  getOrdersByType(type:string = 'all'){
    return this.http.get<Order[]>(`${environment.apiURL}orders/type/${type}`);
  }
  newOrder(order:NewOrder){
    return this.http.post<Order>(`${environment.apiURL}orders`,order);
  }
  updateStatus(idOrder:number, idStatus:object){
    return this.http.patch<Order>(`${environment.apiURL}orders/${idOrder}`,idStatus);
  }

  // ORDERS STATUS CRUD
  getAllOrdersStatus(){
    return this.http.get<OrderStatus[]>(`${environment.apiURL}ordersstatus`);
  }
  getOrdersStatus(id:number){
    return this.http.get<OrderStatus>(`${environment.apiURL}ordersstatus/${id}`);
  }
  updateOrdersStatus(id:number, formData:FormData){
    return this.http.put<OrderStatus>(`${environment.apiURL}ordersstatus/${id}`,formData);
  }
  newOrdersStatus(formData: FormData){
    return this.http.post<OrderStatus>(`${environment.apiURL}ordersstatus`,formData);
  }
  deleteOrdersStatus(id:number){
    return this.http.delete<OrderStatus>(`${environment.apiURL}ordersstatus/${id}`);
  }
}
