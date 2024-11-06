import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel, AlertController, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, createOutline, trashOutline } from 'ionicons/icons';
import { Section } from 'src/app/interfaces/section';
import { GeneralService } from 'src/app/services/general.service';
import { SectionsService } from 'src/app/services/sections.service';
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
export class ShowModalComponent{
  
  @Input() modalID!:string;
  @Input() section!:Section;

  updated:boolean = false;

  constructor(
    private _generalService: GeneralService,
    private _sectionsService: SectionsService,
    private alertController: AlertController
  ) {
    addIcons({close, createOutline, trashOutline})
  }

  ngOnInit() {}

  closeModal(){
    this._generalService.closeModal(this.modalID, {'updated':this.updated});
  }

  async formModal(section:Section){
    const componentProps = {
      section: section
    }
    const modal = await this._generalService.loadModal('sectionEdit', FormModalComponent, componentProps, 0.75);
    modal.present();

    const { data } = await modal.onWillDismiss();

    if(data.updated){
      this.updated = data.updated;
      this.closeModal();
    }
  }

  async delete(section:Section){
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this section?`,
      message: `${section.name} (${section.web})`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(section.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._sectionsService.deleteSection(id).subscribe(
      (result:Section) => {
        this._generalService.presentToast('Section deleted successfuly.');
        this.updated = true;
        this.closeModal()
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this._generalService.presentToast("Error deleting the section: " + error.message, 'danger');
      }
    );
  }
}
