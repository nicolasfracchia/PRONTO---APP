import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonGrid, IonRow, IonCol, IonList, IonItem, IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { menu, receipt, send, cart  } from 'ionicons/icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    IonIcon, 
    IonItem, 
    IonList, 
    IonCol, 
    IonRow, 
    IonGrid, 
  ]
})
export class MenuComponent  implements OnInit {

  constructor() {
    addIcons({ menu, receipt, send, cart });
   }

  ngOnInit() {}

}
