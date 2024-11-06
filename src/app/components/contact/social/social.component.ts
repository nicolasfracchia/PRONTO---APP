import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonIcon, IonItem, IonList } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { logoFacebook, logoInstagram, logoTiktok, mailSharp } from 'ionicons/icons';


@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    IonList,
    IonItem,
    IonIcon
  ]
})
export class SocialComponent  implements OnInit {

  constructor() { 
    addIcons({mailSharp, logoFacebook, logoInstagram, logoTiktok})
  }

  ngOnInit() {}

}
