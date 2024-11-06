import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/app/interfaces/order';
import { IonList, IonItem, IonGrid, IonRow, IonCol, IonLabel, IonItemGroup, IonContent, IonNote } from "@ionic/angular/standalone";
import { GeneralService } from 'src/app/services/general.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { LoggedUser } from 'src/app/interfaces/logged-user';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  standalone: true,
  imports: [
    OrderDetailsComponent,
    CommonModule,
    IonList,
    IonItem,
    IonNote,
  ]
})
export class OrdersListComponent  implements OnInit {
  @Input() orders!:Order[];
  @Input() loggedUser!:LoggedUser;
  
  @Output() refreshOrders: EventEmitter<any> = new EventEmitter<any>();

  public colors:string[] = ['', 'medium', 'secondary', 'primary', 'warning', 'success', 'danger'];
      // Waiting for approval - Confirmed - In progress - On the way - Delivered - Cancelled
  

  constructor(
    private _generalService: GeneralService
  ) { }

  ngOnInit() {}

  async orderDetails(order:Order | undefined = undefined){
    const componentProps = {
      loggedUser: this.loggedUser,
      order: order
    }
    const modal = await this._generalService.loadModal('orderDetails', OrderDetailsComponent, componentProps, 0, 'modal-dialog');

    modal.present();

    modal.onDidDismiss().then(() => {
      this.refreshOrders.emit();
    });
  }

}
