import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonLabel, IonList, IonThumbnail ,IonText ,IonGrid ,IonRow ,IonCol } from '@ionic/angular/standalone';
import { ProductsBySection } from 'src/app/interfaces/products-by-section';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products-by-section',
  templateUrl: './products-by-section.component.html',
  styleUrls: ['./products-by-section.component.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonText, 
    CommonModule,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonItem,
    IonThumbnail,
    IonLabel,
    IonText
  ]
})
export class ProductsBySectionComponent implements OnInit{

  @Input() section!: ProductsBySection;

  foodImagesURL:string = environment.food_images_URL;
  defaultImageURL:string = environment.default_food_image_URL;

  constructor() { 
    
  }

  ngOnInit() { }


}
