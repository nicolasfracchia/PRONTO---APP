import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonInput, IonItem, IonList, IonImg } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageMap } from '@ngx-pwa/local-storage';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonImg,  
    CommonModule, 
    ReactiveFormsModule,
    FormsModule,
    HeaderComponent,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonList,
    IonItem,
    IonButton,
    IonInput
  ]
})
export class LoginPage implements OnInit {
  frm: FormGroup;
  returnPage:string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _loginService: LoginService,
    private _generalService: GeneralService,
    private storage: StorageMap
  ) {
    
    this.frm = formBuilder.group({
      email: ['nfracchia.uoc@hotmail.com', [Validators.required, Validators.email]],
      password: ['12321', Validators.required]
    });
    
    const rp = this.route.snapshot.paramMap.get('returnPage');
    this.returnPage = (rp) ? '/'+rp : '/home';
  }

  ngOnInit() { }


  onSubmit(){
    this._loginService.loginUser(this.frm.value).subscribe({
      next: (user) => {
        this.storage.set('user', user).subscribe(() => {});
        this._generalService.presentToast('Login Successful.');
        this.router.navigate([this.returnPage]);
      },
      error: (err) => {
        this._generalService.presentToast(err.error,'danger');
      }
    });
  }
}
