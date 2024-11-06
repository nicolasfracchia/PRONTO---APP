import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/interfaces/user';
import { UserType } from 'src/app/interfaces/user-type';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, add } from 'ionicons/icons';
import { ShowModalComponent } from 'src/app/components/cms/users/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/users/form-modal/form-modal.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard,   
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

export class UsersPage {

  users!: User[];
  userTypes!: UserType[];

  constructor(
    private _usersService: UsersService, 
    private _generalService: GeneralService
  ) { 
    this.getUsers();
    addIcons({eyeOutline, createOutline, trashOutline, add});
    this._usersService.getUserTypes().subscribe((results) => {
      this.userTypes = results;
    });
  }

  getUsers(){
      this._usersService.getUsers().subscribe((results) => {
        this.users = results;
      });
  }

  async showModal(user:User | undefined = undefined){
    const component = (user) ? ShowModalComponent : FormModalComponent;
    const componentProps = {
      user: user,
      userTypes: this.userTypes
    }
    const modal = await this._generalService.loadModal('userDetails', component, componentProps, 1);

    modal.present();

    const {data} = await modal.onWillDismiss();

    if(data.updated){
      this.getUsers();
    }
  }
}
