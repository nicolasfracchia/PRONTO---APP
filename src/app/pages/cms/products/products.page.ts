import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent ,IonGrid ,IonList ,IonItem ,IonLabel ,IonRow ,IonCol ,IonIcon, IonModal ,IonFab, IonFabButton, IonItemSliding, IonItemOption, IonItemOptions, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductsService } from 'src/app/services/products.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Category } from 'src/app/interfaces/category';
import { Product} from 'src/app/interfaces/product';
import { addIcons } from 'ionicons';
import { createOutline, eyeOutline, trashOutline, cashOutline, add } from 'ionicons/icons';
import { ShowModalComponent } from 'src/app/components/cms/products/show-modal/show-modal.component';
import { FormModalComponent } from 'src/app/components/cms/products/form-modal/form-modal.component';
import { Section } from 'src/app/interfaces/section';
import { SectionsService } from 'src/app/services/sections.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
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
    IonFabButton,
    IonItemSliding,
    IonItemOptions,
    IonItemOption
  ]
})
export class ProductsPage{

  products!: Product[];
  categories!: Category[];
  sections!: Section[];

  constructor(
    private _generalService: GeneralService,
    private _productsService: ProductsService, 
    private _categoriesService: CategoriesService,
    private _sectionsService: SectionsService
  ) { 
    this.getProducts();
    this.getCategories();
    this.getSections();
    addIcons({eyeOutline, createOutline, trashOutline, cashOutline, add})
  }

  getProducts(){
    this._productsService.getAllProducts().subscribe((results:Product[]) => {
      this.products = results;
    });
  }
  getCategories(){
    this._categoriesService.getCategories().subscribe((results:Category[]) => {
      this.categories = results;
    });
  }
  getSections(){
    this._sectionsService.getSections().subscribe((results:Section[]) => {
      this.sections = results;
    });
  }

  async showModal(product:Product | undefined = undefined){
    const component = (product) ? ShowModalComponent : FormModalComponent;
    const componentProps = {
      product: product,
      categories: this.categories,
      sections: this.sections
    }
    const modal = await this._generalService.loadModal('productDetails', component, componentProps, 1);

    modal.present();

    const {data} = await modal.onWillDismiss();

    this.validateModalReturn(data);
  }

  validateModalReturn(data:any = undefined){
    if(data){
      this.getProducts();
      if(data.created){
        this.showModal(data.created);
      }
    }
  }
}
