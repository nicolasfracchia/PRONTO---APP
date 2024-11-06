import { Component } from '@angular/core';
import { IonApp, IonSplitPane, IonRouterOutlet, IonMenu, IonContent } from '@ionic/angular/standalone';
import { MenuComponent } from './components/menu/menu.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  host: {
    theme: 'light'
  },
  imports: [
    CommonModule,
    IonApp,
    IonSplitPane,
    MenuComponent,
    IonRouterOutlet,
    IonMenu,
    IonContent
  ],
})
export class AppComponent {
  constructor() { }
}
