import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { IonContent, IonAccordionGroup, IonAccordion, IonLabel, IonItem, IonList, IonCard, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCardContent, IonThumbnail, IonImg, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonFab, IonFabButton, IonBadge } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleSharp, cartSharp, removeCircleSharp } from 'ionicons/icons';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsBySection } from 'src/app/interfaces/products-by-section';
import { ProductInCart } from 'src/app/interfaces/product-in-cart';
import { CartComponent } from 'src/app/components/cart/cart.component';
import { GeneralService } from 'src/app/services/general.service';
import { NavigationEnd, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Order } from 'src/app/interfaces/order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: true,
  imports: [IonBadge, IonFabButton, IonFab, IonIcon, IonButton, IonCol, IonRow, IonGrid, IonImg, 
    HeaderComponent,
    CommonModule,
    IonContent,
    IonList,
    IonItem, 
    IonLabel, 
    IonAccordion, 
    IonAccordionGroup, 
    IonCardContent, 
    IonCardTitle, 
    IonCardHeader, 
    IonCardSubtitle, 
    IonCard, 
    IonThumbnail
  ]
})
export class OrderPage implements OnInit {
  productsBySection!:ProductsBySection[];
  private updatingUnits:boolean = false;
  private productsInCart: Record<string, ProductInCart> = {};
  public badgeCounter:number = 0;
  public totalPrice:number = 0;

  public foodImagesURL:string = environment.food_images_URL;
  public defaultImageURL:string = environment.default_food_image_URL;


  constructor(
    private _productsService: ProductsService,
    private _generalService: GeneralService,
    private _loginService: LoginService,
    private router: Router
  ) {
   addIcons({addCircleSharp, removeCircleSharp, cartSharp})
   this.getProducts();
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/order') {
        this._loginService.getLoggedUser().subscribe(user => {
          if(user){
            if(this.badgeCounter > 0){
              this.showCart();
            }
          }
        })
      }
    });
  }

  getProducts(){
    this._productsService.getProductsByWebSection('order').subscribe((results) => {
      this.productsBySection = results;
    });
  }

  updateUnits(sectionId:number, productId:number, productPriceId:number, description:string, unitPrice:number, operation:string){    
    if(!this.updatingUnits){
      this.updatingUnits = true;
    
      const element = document.getElementById(`product_price_${productPriceId}`);
    
      if(element){
        const q = parseInt(element.innerHTML);
        let newQ = 0;
        
        if(operation === 'add'){
          newQ = q + 1;
        }else if (operation === 'remove'){
          newQ = (q === 0) ? 0 : q - 1;
        }
        
        element.innerHTML = newQ.toString();
        
        if(newQ > 0){
          this.productsInCart[productPriceId] = {
            sectionId: sectionId,
            productId: productId,
            productPriceId: productPriceId,
            unitPrice: unitPrice,
            quantity: newQ,
            description: description,
          };
        }else{
          delete this.productsInCart[productPriceId];
        }

        this.countProductsQuantity();
      }
      
      this.updatingUnits = false;
    }
  }

  countProductsQuantity(){
    this.badgeCounter = 0;
    this.totalPrice = 0;
    for (const key in this.productsInCart) {
      if (this.productsInCart.hasOwnProperty(key)) {
        this.badgeCounter += this.productsInCart[key].quantity;
        this.totalPrice += this.productsInCart[key].quantity * this.productsInCart[key].unitPrice;
      }
    }
  }

  async showCart(){
    const componentProps = {
      productsInCart: this.productsInCart,
      totalPrice: this.totalPrice
    }
    const modal = await this._generalService.loadModal('userDetails', CartComponent, componentProps, 1);

    modal.present();

    const {data} = await modal.onWillDismiss();

    if(data){
      if(data.type === 'editQ'){
        this.showProductFromCart(data.sectionId, data.productId, data.productPriceId);
      }
      if(data.type === 'emptyCart'){
        this.emptyCart()
      }
      if(data.type === 'orderPlaced'){
        this.orderPlaced(data.order);
      }
      
      return true;
    }else{
      return false;
    }


  }

  showProductFromCart(sectionId:number, productId:number, productPriceId:number){

    const mainAccordionGroup = document.getElementById('mainAccordionGroup') as unknown as IonAccordionGroup;
    const internalAccordionGroup = document.getElementById(`accordionGroup_${sectionId}`) as unknown as IonAccordionGroup;
    const priceRow = document.getElementById(`row_productPrice_${productPriceId}`);
    
    mainAccordionGroup.animated = false;
    internalAccordionGroup.animated = false;

    mainAccordionGroup.value = `accordion_section_${sectionId}`;
    internalAccordionGroup.value = `accordion_product_${productId}`;

    
    setTimeout(() => {document.getElementById(`accordionGroup_${sectionId}`)?.scrollIntoView({behavior: 'instant',block: 'start'});}, 100);
    setTimeout(() => {priceRow?.classList.add('priceContainerSel');}, 300);
    setTimeout(() => {priceRow?.classList.remove('priceContainerSel');}, 600);
    setTimeout(() => {
      mainAccordionGroup.animated = true;
      internalAccordionGroup.animated = true;
    }, 700);

  }

  emptyCart(){
    this.productsInCart = {};
    this.badgeCounter = 0;
    this.totalPrice = 0;
    const quantities = document.getElementsByClassName('product_price_quantity');
    for(let i = 0; i < quantities.length; i++){
      quantities[i].innerHTML = '0';
    }
  }

  orderPlaced(order:Order){
    this._generalService.presentToast('Order successfully placed');
    this.router.navigate(['/home']);
  }


}
