import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonList, IonItem, IonIcon, IonLabel, IonFooter, IonToolbar, IonTitle, IonHeader, IonContent, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCol, IonGrid, IonRow, IonSelect, IonSelectOption, IonButton } from "@ionic/angular/standalone";
import { Order } from 'src/app/interfaces/order';
import { OrderStatus } from 'src/app/interfaces/order-status';
import { OrdersService } from 'src/app/services/orders.service';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoggedUser } from 'src/app/interfaces/logged-user';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  standalone: true,
  imports: [IonButton, IonRow, IonGrid, IonCol, IonCardTitle, IonCardContent, IonCardHeader, IonCard, 
    FormsModule,
    ReactiveFormsModule,
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonFooter, 
    IonLabel, 
    IonIcon, 
    IonItem, 
    IonList, 
    CommonModule,
    IonSelect,
    IonSelectOption
  ]
})
export class OrderDetailsComponent implements OnInit{
  @Input() order!:Order;
  @Input() loggedUser!:LoggedUser;

  public orderStatuses!:OrderStatus[];
  public colors:string[] = ['', 'medium', 'secondary', 'primary', 'warning', 'success', 'danger']; // Waiting for approval - Confirmed - In progress - On the way - Delivered - Cancelled
  public nextOrderStatusId!:number;
  public updated:boolean = false;
  
  frm: FormGroup;

  
  constructor(
    private formBuilder: FormBuilder,
    private _orderStatusService: OrdersService
  ) {
    this.getOrderStatuses();

    this.frm = formBuilder.group({
      nextOrderStatus: ['', [Validators.required]]
    });
  }

  ngOnInit(){
    this.frm.patchValue({nextOrderStatus: this.order.OrdersStatus.id + 1});
  }

  getOrderStatuses(){
    this._orderStatusService.getAllOrdersStatus().subscribe(results => {
      this.orderStatuses = results;
      this.nextOrderStatusId = this.order.OrdersStatus.id + 1;
    })
  }

  updateStatus(){
    this._orderStatusService.updateStatus(this.order.id, {'idStatus':this.frm.value.nextOrderStatus}).subscribe(result => {
      this.order = result;
      this.updated = true;
    })
  }

  changeBtnColor(){
    this.nextOrderStatusId = this.frm.value.nextOrderStatus;
  }

}
