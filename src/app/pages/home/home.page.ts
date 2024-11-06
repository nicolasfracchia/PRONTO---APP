import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { MenuComponent } from 'src/app/components/home/menu/menu.component'; 
import { LoginComponent } from 'src/app/components/home/login/login.component'; 
import { IonContent } from '@ionic/angular/standalone';
import { LoggedUserComponent } from 'src/app/components/home/logged-user/logged-user.component';
import { LoggedUser } from 'src/app/interfaces/logged-user';
import { LoginService } from 'src/app/services/login.service';
import { StorageMap } from '@ngx-pwa/local-storage';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule, 
    HeaderComponent,
    MenuComponent,
    LoginComponent,
    LoggedUserComponent
  ]
})
export class HomePage implements OnInit {
  public loggedUser!:LoggedUser;
  private userSubscription!: Subscription;

  constructor(
    private _loginService:LoginService,
    private storage: StorageMap
  ) { 
    this.getLoggedUser();
  }

  ngOnInit() {
    this.setUserSubscription()
  }

  getLoggedUser(){
    this._loginService.getLoggedUser().subscribe(user => {
      if(user){
        this.loggedUser = user as LoggedUser;
      }
    })
  }

  setUserSubscription(){
    this.userSubscription = this.storage.watch('user').subscribe((user) => {
      this.loggedUser = user as LoggedUser;
    });
  }

}
