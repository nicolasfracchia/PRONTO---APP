import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent, IonList, IonItem, IonIcon, IonCardSubtitle, IonCardHeader, IonCardTitle, IonButton, IonCard, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { addIcons } from 'ionicons';
import { createOutline } from 'ionicons/icons';
import { GeneralService } from 'src/app/services/general.service';
import { UsersService } from 'src/app/services/users.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LoggedUser } from 'src/app/interfaces/logged-user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    IonContent,
    IonList, 
    IonItem, 
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon
  ]
})
export class UserProfilePage implements OnInit {
  public user!:LoggedUser;
  private editingField!:string;
  private editingLabel!:string;

  constructor(
    private _loginService: LoginService,
    private _generalService: GeneralService,
    private _usersService: UsersService,
    private alertController: AlertController,
    private storage: StorageMap
  ) {
    this.getUser();
    addIcons({createOutline})
  }

  ngOnInit() {
    
  }

  getUser(){
    this._loginService.getLoggedUser().subscribe(user => {
      this.user = user as LoggedUser;
    })
  }

  async formAlert(field:string){
    this.editingField = field;
    const alertInputs = this.setAlertInput();
    this.editingLabel = alertInputs[0].placeholder;

    const alert = await this.alertController.create({
      header: `Edit your ${this.editingLabel}`,
      inputs: alertInputs,
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {text: 'Submit', role: 'confirm', handler: (v) => { this.updateUser(v[0]) }},
      ]
    });
    
    await alert.present();
  }

  setAlertInput(){
    switch(this.editingField){
      case 'name': return [{placeholder: 'Name', value: this.user.name}]; break;
      case 'lastName': return [{placeholder: 'Last Name', value: this.user.lastName}]; break;
      case 'email': return [{placeholder: 'Email', value: this.user.email}]; break;
      case 'address': return [{placeholder: 'Address', value: this.user.address}]; break;
      default: return [];
    }
  }

  updateUser(value:string):void{
    if(value === ''){
      this._generalService.presentToast(`Your ${this.editingLabel} can not be empty`, 'danger');
    }else{
      const formData = {
        [this.editingField]: value
      };

      this._usersService.updateUserProfile(formData).subscribe((result:User) => {
        const userUpdated = {
          name: result.name,
          lastName: result.lastName,
          address: result.address,
          email: result.email
        };
        
        this.updatedStoredUser(userUpdated);
      });
    }
  }

  updatedStoredUser(userUpdated:any){
    this.storage.get('user').subscribe((currentUser:any) => {
      const newUserData = {...userUpdated, role: currentUser.role, token: currentUser.token}
      this.storage.set('user', newUserData).subscribe({
        next: () => {
          this.getUser();
          this._generalService.presentToast(`Your ${this.editingLabel} has been successfully updated`)
        },
        error: (error) => {
          this._generalService.presentToast(`There was an error updating your ${this.editingLabel}, please try again later.`)
        },
      });


    });
  }


}
