import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel, IonCardSubtitle, IonCardContent, IonCardHeader, IonCard, IonGrid, IonRow, IonCol, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, createOutline, trashOutline } from 'ionicons/icons';
import { Category } from 'src/app/interfaces/category';
import { CategoriesService } from 'src/app/services/categories.service';
import { GeneralService } from 'src/app/services/general.service';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonCard, IonCardHeader, IonCardContent, IonCardSubtitle, 
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
  @Input() category!:Category;
  
  updated:boolean = false;

  constructor(
    private _generalService: GeneralService,
    private _categoriesService: CategoriesService,
    private alertController: AlertController
  ) {
    addIcons({close, createOutline, trashOutline})
  }

  ngOnInit() {}

  closeModal(){
    this._generalService.closeModal(this.modalID, {'updated':this.updated});
  }

  async formModal(category:Category){
    const componentProps = {
      category: category
    }
    const modal = await this._generalService.loadModal('categoryEdit', FormModalComponent, componentProps, 0.5);
    modal.present();

    const { data } = await modal.onWillDismiss();

    if(data.updated){
      this.updated = data.updated;
      this.closeModal();
    }
  }

  async delete(category:Category){
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this category?`,
      message: `${category.name}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(category.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._categoriesService.deleteCategory(id).subscribe(
      (result:Category) => {
        this._generalService.presentToast('Category deleted successfuly.');
        this.updated = true;
        this.closeModal()
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this._generalService.presentToast("Error deleting the category: " + error.message, 'danger');
      }
    );
  }
}
