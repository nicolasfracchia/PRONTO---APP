import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoggedUser } from 'src/app/interfaces/logged-user';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent } from "@ionic/angular/standalone";
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders.service';
import { OrdersListComponent } from '../../orders-list/orders-list.component';

@Component({
  selector: 'app-logged-user',
  templateUrl: './logged-user.component.html',
  styleUrls: ['./logged-user.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    OrdersListComponent,
    IonCard,
    IonCardHeader, 
    IonCardContent, 
    IonCardTitle, 
    IonCardSubtitle, 
  ]
})
export class LoggedUserComponent  implements OnInit {
  @Input() loggedUser!:LoggedUser;
  public subtitle:string = "You have no pending orders";
  public pendingOrders!:Order[];

  constructor(
    private _ordersService: OrdersService
  ) {
    this.getPendingOrders();
   }

  ngOnInit() {}

  getPendingOrders(){
    this._ordersService.getOrdersByType('pending').subscribe((orders:Order[]) => {
      if(orders.length > 0){
        this.pendingOrders = orders;
        this.subtitle = "Your pending orders:";
      }
    })
  }

}
