import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar ,IonButtons, IonTitle ,IonIcon, IonButton ,IonContent ,IonList ,IonItem ,IonLabel ,IonDatetimeButton ,IonInput ,IonTextarea ,IonModal, IonSelectOption, IonSelect } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { Section } from 'src/app/interfaces/section';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SectionsService } from 'src/app/services/sections.service';
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
    IonSelectOption,
    IonSelect
  ]
})
export class FormModalComponent  implements OnInit {
  @Input() modalID!:string;
  @Input() section:Section | undefined;
  
  webOptions!:string[];
  frm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private _sectionsService: SectionsService,
    private _generalService: GeneralService,
    
  ) {
    addIcons({close})

    this.frm = formBuilder.group({
      name: ['', [Validators.required]],
      web: ['', [Validators.required]]
    });

    this.webOptions = this._sectionsService.getWebOptions();
  }

  ngOnInit() {
    this.frm.patchValue({name: this.section?.name, web: this.section?.web});
  }

  onSubmit(){
    const formData = this.frm.value;
    if(this.section){
      this.update();
    }else{
      this.create();
    }
    return true;
  }

  update():any{
    if(this.section?.id){
      this._sectionsService.updateSection(this.section.id, this.frm.value).subscribe((result:Section) => {
        this._generalService.presentToast('Section updated successfuly.');
        this.closeModal({'updated':true});
      });
    }else{
      return false;
    }
  }

  create(){
    this._sectionsService.newSection(this.frm.value).subscribe((result:Section) => {
      this.frm.reset();
      this._generalService.presentToast('Section created successfuly.');
      this.closeModal({'updated':true});
    });
  }
  
  closeModal(data:any = undefined){
    this._generalService.closeModal(this.modalID, data);
  }
}
