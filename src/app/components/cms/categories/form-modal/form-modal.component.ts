import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem,IonInput } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Category } from 'src/app/interfaces/category';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriesService } from 'src/app/services/categories.service';
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
  ]
})
export class FormModalComponent  implements OnInit {
  @Input() modalID!:string;
  @Input() category:Category | undefined;
  frm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _generalService: GeneralService,
    private _categoriesService: CategoriesService
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.frm.patchValue({name: this.category?.name});
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.category){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.category?.id){
      this._categoriesService.updateCategory(this.category.id, this.frm.value).subscribe((result:Category) => {
        this._generalService.presentToast('Category updated successfuly.');
        this.closeModal({'updated':true});
      });
    }else{
      return false;
    }
  }

  create(){
    this._categoriesService.newCategory(this.frm.value).subscribe((result:Category) => {
      this.frm.reset();
      this._generalService.presentToast('Category created successfuly.');
        this.closeModal({'updated':true});
    });
  }

  closeModal(data:any = undefined){
    this._generalService.closeModal(this.modalID, data);
  }

}
