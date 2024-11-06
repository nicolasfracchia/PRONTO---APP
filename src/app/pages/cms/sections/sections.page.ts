import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, IonCard, IonCardSubtitle, IonCardTitle, IonCardHeader } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { SectionsService } from 'src/app/services/sections.service';
import { Section } from 'src/app/interfaces/section';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, add } from 'ionicons/icons';
import { ShowModalComponent } from 'src/app/components/cms/sections/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/sections/form-modal/form-modal.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.page.html',
  styleUrls: ['./sections.page.scss'],
  standalone: true,
  imports: [IonCardHeader, IonCardTitle, IonCardSubtitle, IonCard,   
    CommonModule,
    HeaderComponent,
    ShowModalComponent,
    FormModalComponent,
    IonContent,
    IonList,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonLabel,
    IonIcon,
    IonModal,
    IonFab,
    IonFabButton
  ]
})
export class SectionsPage{

  sections!: Section[];

  constructor(
    private _sectionsService: SectionsService, 
    private _generalService: GeneralService
  ) { 
    this.getSections();
    addIcons({eyeOutline, createOutline, trashOutline, add})
  }

  getSections(){
    this._sectionsService.getSections().subscribe((results) => {
      this.sections = results;
    });
  }

  async showModal(section:Section | undefined = undefined){
    const component = (section) ? ShowModalComponent : FormModalComponent;
    const componentProps = {
      section: section
    }
    const modal = await this._generalService.loadModal('sectionDetails', component, componentProps, 1);

    modal.present();

    const {data} = await modal.onWillDismiss();

    if(data?.updated){
      this.getSections();
    }
  }

}
