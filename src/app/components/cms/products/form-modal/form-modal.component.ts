import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem, IonInput, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Product } from 'src/app/interfaces/product';
import { Category } from 'src/app/interfaces/category';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-form-modal',
  templateUrl: './form-modal.component.html',
  styleUrls: ['./form-modal.component.scss'],
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
export class FormModalComponent  implements OnInit {

  @Input() modalID!:string;
  @Input() product:Product | undefined;
  @Input() categories!:Category[];
  
  frm: FormGroup;
  product_image!: File;

  constructor(
    private formBuilder: FormBuilder,
    private _generalService: GeneralService,
    private _productsService: ProductsService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]],
      image: [''],
      categoryId: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.frm.patchValue({
      name: this.product?.name,
      image: this.product?.image,
      categoryId: this.product?.Category?.id,
    });
  }

  onSubmit(){
    let formData = new FormData();

    if(this.product_image){
      formData.append('product_image', this.product_image)
    }

    for(let key in this.frm.value){
      formData.append(key, this.frm.value[key]);
    }

    if(this.product){
      this.update(formData);
    }else{
      this.create(formData);
    }
    return true;
  }

  update(formData:FormData):any{
    if(this.product?.id){
      this._productsService.updateProduct(this.product.id, formData).subscribe((result:Product) => {
        this._generalService.presentToast('Product updated successfuly.');
        this.closeModal({'updated':true});
      });
    }else{
      return false;
    }
  }

  create(formData:FormData){
    this._productsService.newProduct(formData).subscribe((result:Product) => {
      this.frm.reset();
      this._generalService.presentToast('Product created successfuly.');
      this.closeModal({'created':result});
    });
  }

  closeModal(data:any = undefined){
    this._generalService.closeModal(this.modalID, data);
  }

  onFileSelected(event: any) {
    this.product_image = event.target.files[0];
  }

  

}
