import { Injectable } from '@angular/core';
import { ModalController, ModalOptions, ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  constructor(
    private modalController: ModalController,
    private toastController: ToastController
  ) { }

  async loadModal(modalID:string, component:any, componentProps:any = {}, initialBreakpoint:number = 0.5, cssClass:string = ''){
    let modalProperties:ModalOptions = {
      id: modalID,
      component: component,
      handleBehavior: 'cycle',
      breakpoints:[0, 0.25, 0.5, 0.75, 1],
      componentProps: {...componentProps,modalID:modalID},
      cssClass: cssClass
    };
    if(initialBreakpoint !== 0){
      modalProperties.initialBreakpoint = initialBreakpoint;
    }

    const modal = await this.modalController.create(modalProperties);

    return modal;
  }

  closeModal(modalID:string, data:any = null){
    this.modalController.dismiss(data, '', modalID);
  }

  async presentToast(message:string, color:string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: color
    });

    await toast.present();
  }

}
