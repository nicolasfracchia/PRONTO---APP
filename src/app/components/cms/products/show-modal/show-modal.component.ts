import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel, IonGrid, IonRow, IonCol,  IonCardSubtitle, IonCardTitle, IonCard, IonCardHeader, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, createOutline, trashOutline } from 'ionicons/icons';
import { Product } from 'src/app/interfaces/product';
import { ProductPrice } from 'src/app/interfaces/product-price';
import { PriceFormModalComponent } from '../price-form-modal/price-form-modal.component';
import { FormModalComponent } from '../form-modal/form-modal.component';
import { Category } from 'src/app/interfaces/category';
import { Section } from 'src/app/interfaces/section';
import { GeneralService } from 'src/app/services/general.service';
import { ProductsService } from 'src/app/services/products.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-show-modal',
  templateUrl: './show-modal.component.html',
  styleUrls: ['./show-modal.component.scss'],
  standalone: true,
  imports: [
    IonLabel, 
    IonItem, 
    IonList, 
    CommonModule,
    IonContent,  
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons, 
    IonIcon,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardSubtitle, 
    IonCardContent, 
  ]
})
export class ShowModalComponent  implements OnInit {

  @Input() modalID!:string;
  @Input() product!:Product;
  @Input() categories!:Category[];
  @Input() sections!:Section[];

  updated:boolean = false;
  showImage!:string;
  foodImagesURL:string = environment.food_images_URL;

  constructor(
    private _generalService: GeneralService,
    private _productsService: ProductsService,
    private alertController: AlertController
  ) {
    addIcons({close, createOutline, trashOutline})
  }

  ngOnInit() {
    this.getImage();
  }

  closeModal(){
    this._generalService.closeModal(this.modalID, {'updated':this.updated});
  }

  getProduct(){
    this._productsService.getProduct(this.product.id).subscribe((results:Product) => {
      this.product = results;
      this.getImage();
    });
  }
  getImage(){
    this.showImage = (this.product.image === 'default.png') ? environment.default_food_image_URL : this.foodImagesURL + this.product.image;
  }

  // PRODUCTS CRUD

  async editProductModal(product:Product){
    const componentProps = {
      product: product,
      categories: this.categories
    }
    const modal = await this._generalService.loadModal('productEdit', FormModalComponent, componentProps, .75);
    modal.present();

    const { data } = await modal.onWillDismiss();

    if(data.updated){
      this.updated = data.updated;
      this.getProduct();
    }
  }

  async delete(product:Product){
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this product?`,
      message: `${product.Category.name} - ${product.name}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deleteConfirmed(product.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deleteConfirmed(id:number){
    this._productsService.deleteProduct(id).subscribe(
      (result:Product) => {
        this._generalService.presentToast('Product deleted successfuly.');
        this.updated = true;
        this.closeModal()
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this._generalService.presentToast("Error deleting the product: " + error.message, 'danger');
      }
    );
  }

  // PRICES CRUD
  async formPriceModal(product:Product, price:ProductPrice | undefined = undefined){
    const componentProps = {
      product: product,
      price: price,
      sections: this.sections
    }
    const modal = await this._generalService.loadModal('priceEdit', PriceFormModalComponent, componentProps, .75);
    modal.present();

    const { data } = await modal.onWillDismiss();
    if(data.updated){
      this.updated = data.updated;
      this.getProduct();
    }
  }

  async deletePrice(price:ProductPrice){
    const alert = await this.alertController.create({
      header: `Are you sure you want to delete this price?`,
      message: `${price.concept}  $ ${price.price}`,
      buttons: [
        {text: 'Cancel',role: 'cancel'},
        {
          text: 'Delete',
          cssClass: 'danger',
          handler: () => {
            this.deletePriceConfirmed(price.id);
          }
        }
      ]
    });
  
    await alert.present();
  }

  deletePriceConfirmed(id:number){
    this._productsService.deletePrice(id).subscribe(
      (result:ProductPrice) => {
        this._generalService.presentToast('Price deleted successfuly.');
        this.getProduct()
      },
      (error:any) => {
        console.error('ERROR DELETE:',error.message)
        this._generalService.presentToast("Error deleting the price: " + error.message, 'danger');
      }
    );
  }


}
