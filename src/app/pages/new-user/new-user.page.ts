import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonList, IonItem, IonButton, IonInput, IonIcon } from "@ionic/angular/standalone";
import { HeaderComponent } from 'src/app/components/header/header.component';
import { addIcons } from 'ionicons';
import { eye } from 'ionicons/icons';
import { UsersService } from 'src/app/services/users.service';
import { GeneralService } from 'src/app/services/general.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.page.html',
  styleUrls: ['./new-user.page.scss'],
  standalone: true,
  imports: [IonIcon, IonInput, 
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HeaderComponent,
    IonContent,
    IonButton, 
    IonItem, 
    IonList, 
    IonHeader, 
  ]
})
export class NewUserPage implements OnInit {
  @ViewChild('inputPassword') inputPassword!: ElementRef;

  frm: FormGroup;
  showPassword:boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private storage: StorageMap,
    private router: Router,
    private _userService: UsersService,
    private _generalService: GeneralService
  ) {
    addIcons({eye})
    this.frm = formBuilder.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit(){
    this._userService.newCustomer(this.frm.value).subscribe(result => {
      this.storage.set('user', result).subscribe(() => {});
      this._generalService.presentToast('Your account was created successfully. Welcome!');
      this.router.navigate(['/home']);
    },
    error => {
      this._generalService.presentToast(error.error,'danger');
    })
  }

  showPasswordToggle(){
    this.showPassword = !this.showPassword;
    if(this.inputPassword){
      this.inputPassword.nativeElement.type = this.showPassword ? 'text' : 'password';
    }
  }

}
