import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { OrdersService } from 'src/app/services/orders.service';
import { OrderStatus } from 'src/app/interfaces/order-status';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ShowModalComponent } from 'src/app/components/cms/orders-status/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/orders-status/form-modal/form-modal.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-orders-status',
  templateUrl: './orders-status.page.html',
  styleUrls: ['./orders-status.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard,   
    CommonModule,
    HeaderComponent,
    ShowModalComponent,
    FormModalComponent,
    IonContent,
    IonList,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonIcon,
    IonModal,
    IonFab,
    IonFabButton
  ]
})
export class OrdersStatusPage {

  statuses!: OrderStatus[];

  constructor(
    private _ordersService: OrdersService, 
    private _generalService: GeneralService
  ) { 
    this.getStatuses();
    addIcons({add})
  }

  getStatuses(){
    this._ordersService.getAllOrdersStatus().subscribe((results) => {
      this.statuses = results;
    });
  }

  async showModal(status:OrderStatus | undefined = undefined){
    const component = (status) ? ShowModalComponent : FormModalComponent;
    const componentProps = {
      orderStatus: status
    }
    const modal = await this._generalService.loadModal('categoryDetails', component, componentProps, 0.5);

    modal.present();

    const {data} = await modal.onWillDismiss();

    if(data?.updated){
      this.getStatuses();
    }
  }

}
