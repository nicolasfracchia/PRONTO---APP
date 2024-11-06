import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonButtons, IonButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonButton, 
    IonButtons,
    RouterLink
  ]
})
export class LoginComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
