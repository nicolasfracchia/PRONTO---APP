import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonItem,IonLabel, IonList ,IonInput ,IonTextarea } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { FormComponent } from 'src/app/components/contact/form/form.component';
import { SocialComponent } from 'src/app/components/contact/social/social.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonInput, IonLabel, 
    CommonModule,
    IonContent,
    HeaderComponent,
    FormComponent,
    SocialComponent
  ]
})
export class ContactPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
