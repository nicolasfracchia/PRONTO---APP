import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem,IonInput ,IonTextarea ,IonModal, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Product } from 'src/app/interfaces/product';
import { Category } from 'src/app/interfaces/category';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { Section } from 'src/app/interfaces/section';
import { GeneralService } from 'src/app/services/general.service';
import { ProductPrice } from 'src/app/interfaces/product-price';

@Component({
  selector: 'app-price-form-modal',
  templateUrl: './price-form-modal.component.html',
  styleUrls: ['./price-form-modal.component.scss'],
  standalone:true,
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,  
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButtons, 
    IonIcon,
    IonButton,
    IonInput, 
    IonItem, 
    IonList,
    IonSelect,
    IonSelectOption
  ]
})
export class PriceFormModalComponent  implements OnInit {
  @Input() modalID!:string;
  @Input() product!:Product;
  @Input() price!:ProductPrice | undefined;
  @Input() sections!:Section[];
  
  title!:string;
  frm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _productsService: ProductsService,
    private _generalService: GeneralService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      concept: [''],
      price: [0],
      sectionId: ['', [Validators.required]],
    });
  }

  ngOnInit() {    
    this.frm.patchValue({
      concept: this.price?.concept,
      price: this.price?.price,
      sectionId: this.price?.Section?.id,
    });
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.price){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.price){
      this._productsService.updateProductPrice(this.price.id, this.frm.value).subscribe((result:any) => {
        this._generalService.presentToast('Price updated successfuly.');
        this.closeModal({'updated':true});
      });
    }else{
      this._generalService.presentToast('There was an error updating the price.', 'danger');
    }
  }

  create(){
    const newPrice = {prices: [this.frm.value]};
    
    this._productsService.newProductPrice(this.product.id, newPrice).subscribe((result:any) => {
      this.frm.reset();
      this._generalService.presentToast('Price added successfuly.');
      this.closeModal({'updated':true});
    });
    
  }

  closeModal(data:any = undefined){
    this._generalService.closeModal(this.modalID, data);
  }

}
