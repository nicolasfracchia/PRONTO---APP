import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonInput, IonItem, IonList, IonTextarea } from '@ionic/angular/standalone';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    IonList,
    IonItem,
    IonInput,
    IonTextarea
  ]
})
export class FormComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
