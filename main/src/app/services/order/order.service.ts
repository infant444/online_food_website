import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from 'src/app/data/cart/order';
import { ORDER_CREATED, ORDER_LIST, ORDER_LIST_ALL, ORDER_LIST_CHANGE_STATUS, ORDER_LIST_DATE, ORDER_LIST_DELETE, ORDER_PAY, ORDER_PAY_SEND_MAIL, ORDER_TRACK } from 'src/app/data/constent/urls';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http:HttpClient) { }
  create(order:Order){
    return this.http.post<Order>(ORDER_CREATED,order);
  }
  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY,order);
  }

  trackOrderById(order_id:string):Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK+order_id);
  }

  Order_item():Observable<Order[]>{
    return this.http.get<Order[]>(ORDER_LIST);
  }
  Order_item_all():Observable<Order[]>{
    return this.http.get<Order[]>(ORDER_LIST_ALL);
  }
Order_item_Date(x:any):Observable<Order[]>{
  return this.http.post<Order[]>(ORDER_LIST_DATE,x);
}
Order_item_change_status(x:string,status:any){
  return this.http.post(ORDER_LIST_CHANGE_STATUS+x,status);
}
Order_item_delete(x:string,){
  return this.http.delete(ORDER_LIST_DELETE+x);
}
  sendmail(order_id:string){
    return this.http.get(ORDER_PAY_SEND_MAIL+order_id);
  }
}
