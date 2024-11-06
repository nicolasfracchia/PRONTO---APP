import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, createOutline, trashOutline } from 'ionicons/icons';
import { OrderStatus } from 'src/app/interfaces/order-status';
import { GeneralService } from 'src/app/services/general.service';
import { OrdersService } from 'src/app/services/orders.service';
import { FormModalComponent } from '../form-modal/form-modal.component';


@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, 
    IonLabel, 
    IonItem, 
    IonList, 
    CommonModule,
    IonContent,  
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons, 
    IonIcon,
    IonButton
  ]
})
export class ShowModalComponent  implements OnInit {
  @Input() modalID!:string;
  @Input() orderStatus!:OrderStatus;
  
  updated:boolean = false;

  constructor(
    private _generalService: GeneralService,
    private _ordersStatusService: OrdersService,
    private alertController: AlertController
  ) {
    addIcons({close, createOutline, trashOutline})
  }

  ngOnInit() {}

  closeModal(){
    this._generalService.closeModal(this.modalID, {'updated':this.updated});
  }

  async formModal(status:OrderStatus){
    const componentProps = {
      orderStatus: status
    }
    const modal = await this._generalService.loadModal('orderStatusEdit', FormModalComponent, componentProps, 0.5);
    modal.present();

    const { data } = await modal.onWillDismiss();

    if(data?.updated){
      this.updated = data.updated;
      this.closeModal();
    }
  }

  async delete(status:OrderStatus){
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this status?`,
      message: `${status.name}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(status.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._ordersStatusService.deleteOrdersStatus(id).subscribe(
      (result:OrderStatus) => {
        this._generalService.presentToast('Orders status deleted successfuly.');
        this.updated = true;
        this.closeModal()
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this._generalService.presentToast("Error deleting the order status: " + error.message, 'danger');
      }
    );
  }
}
