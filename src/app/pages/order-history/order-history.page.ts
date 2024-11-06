import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from 'src/app/components/orders-list/orders-list.component';
import { OrdersService } from 'src/app/services/orders.service';
import { Order } from 'src/app/interfaces/order';
import { IonContent, IonLabel, IonListHeader, IonList } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/components/header/header.component';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.page.html',
  styleUrls: ['./order-history.page.scss'],
  standalone: true,
  imports: [IonList, IonListHeader, IonLabel,  
    CommonModule,
    OrdersListComponent,
    HeaderComponent,
    IonContent
  ]
})
export class OrderHistoryPage implements OnInit {
  public pendingOrders!:Order[];
  public title:string = 'No orders to show';

  constructor(
    private _ordersService: OrdersService
  ) {
    this.getPendingOrders();
   }

  ngOnInit() {}

  getPendingOrders(){
    this._ordersService.getOrdersByType('all').subscribe((orders:Order[]) => {
      if(orders.length > 0){
        this.title = 'Your orders';
        this.pendingOrders = orders;
      }
    })
  }

}
