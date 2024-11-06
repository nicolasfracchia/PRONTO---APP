import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { ShowModalComponent } from 'src/app/components/cms/categories/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/categories/form-modal/form-modal.component';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardSubtitle, IonCardHeader, IonCard,   
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
export class CategoriesPage{

  categories!: Category[];

  constructor(
    private _categoriesService: CategoriesService, 
    private _generalService: GeneralService
  ) { 
    this.getCategories();
    addIcons({add})
  }

  getCategories(){
      this._categoriesService.getCategories().subscribe((results) => {
        this.categories = results;
      });
  }

  async showModal(category:Category | undefined = undefined){
    const component = (category) ? ShowModalComponent : FormModalComponent;
    const componentProps = {
      category: category
    }
    const modal = await this._generalService.loadModal('categoryDetails', component, componentProps, 0.5);

    modal.present();

    const {data} = await modal.onWillDismiss();

    if(data?.updated){
      this.getCategories();
    }
  }
}
