import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonGrid, IonRow, IonCol, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, createOutline, trashOutline } from 'ionicons/icons';
import { User } from 'src/app/interfaces/user';
import { UserType } from 'src/app/interfaces/user-type';
import { GeneralService } from 'src/app/services/general.service';
import { UsersService } from 'src/app/services/users.service';
import { FormModalComponent } from '../form-modal/form-modal.component';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, 
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
  @Input() user!:User;
  @Input() userTypes!:UserType;

  updated:boolean = false;

  constructor(
    private _generalService: GeneralService,
    private _usersService: UsersService,
    private alertController: AlertController
  ) {
    addIcons({close, createOutline, trashOutline})
  }

  ngOnInit() {}

  closeModal(){
    this._generalService.closeModal(this.modalID, {'updated':this.updated});
  }

  async formModal(user:User){
    const componentProps = {
      user: user,
      userTypes: this.userTypes
    }
    const modal = await this._generalService.loadModal('userEdit', FormModalComponent, componentProps, 0.75);
    modal.present();

    const { data } = await modal.onWillDismiss();

    if(data.updated){
      this.updated = data.updated;
      this.closeModal();
    }
  }

  async delete(user:User){
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this user?`,
      message: `${user.name} ${user.lastName}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            if(user.id){
              this.deleteConfirmed(user.id);
            }
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._usersService.deleteUser(id).subscribe(
      (result:User) => {
        this._generalService.presentToast('User deleted successfuly.');
        this.updated = true;
        this.closeModal()
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this._generalService.presentToast("Error deleting the user: " + error.message, 'danger');
      }
    );
  }
}
