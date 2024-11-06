import { CommonModule, KeyValue } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, AlertController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close, create } from 'ionicons/icons';
import { GeneralService } from 'src/app/services/general.service';
import { ProductInCart } from 'src/app/interfaces/product-in-cart';
import { LoginService } from 'src/app/services/login.service';
import { LoggedUser } from 'src/app/interfaces/logged-user';
import { Router } from '@angular/router';
import { NewOrder, OrderProductPrice } from 'src/app/interfaces/new-order';
import { Order } from 'src/app/interfaces/order';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,  
    IonHeader,
    IonToolbar,
    IonTitle,
    IonIcon,
    IonButtons,
    IonButton,
    IonItem, 
    IonList,
    IonCardContent, 
    IonCardTitle, 
    IonCardHeader, 
    IonCard, 
    IonCol, 
    IonRow, 
    IonGrid, 
  ]
})
export class CartComponent  implements OnInit {
  @Input() modalID!:string;
  @Input() productsInCart!:ProductInCart[];
  @Input() totalPrice!:number;
  public user!:LoggedUser;

  constructor(
    private _generalService: GeneralService,
    private _loginService: LoginService,
    private _ordersService: OrdersService,
    private router: Router,
    private alertController: AlertController
  ) { 
    addIcons({close, create});
    this.getLoggedUser();
  }

  ngOnInit() {
    this.productsInCart = Object.values(this.productsInCart);
  }

  getLoggedUser(){
    this._loginService.getLoggedUser().subscribe(user => {
      this.user = user as LoggedUser;
    });
  }

  redirectLogin(){
    this.closeModal();
    this.router.navigate(['/login/order']);
  }

  closeModal(data:any = undefined){
    this._generalService.closeModal(this.modalID, data);
  }

  onSubmit(deliveryDate:string){
    const date = deliveryDate.split('T');

    let order: NewOrder = {
      forDate: date[0],
      forTime: date[1],
      points: 0,
      productPrices: []
    };

    this.productsInCart.forEach(p => {
      const product:OrderProductPrice = {
        productPriceId: p.productPriceId, 
        quantity: p.quantity
      };

      order.productPrices.push(product);
    });

    this._ordersService.newOrder(order).subscribe((order:Order) => {
      this.closeModal({"type":"orderPlaced","order":order});
    })
  }

  async formAlert(){
    const alert = await this.alertController.create({
      header: "Select date and time for your delivery",
      inputs: [{
          name: 'delivery',
          type: 'datetime-local',
          min: new Date().toISOString()
        }
      ],
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {text: 'PLACE ORDER', role: 'confirm', handler: (v) => { this.onSubmit(v.delivery) }},
      ]
    });
    
    await alert.present();
  }

  async resetCart(){
    const alert = await this.alertController.create({
      header: "Are you sure you want to empty the cart?",
      buttons: [
        {text: 'Cancel', role: 'cancel'},
        {text: 'Empty cart', role: 'confirm', handler: (v) => { 
          this._generalService.presentToast('Cart successfully emptied', 'warning');
          this.closeModal({"type":"emptyCart"}) 
        }},
      ]
    });
    
    await alert.present();
  }

}
