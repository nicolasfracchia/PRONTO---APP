import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { ProductsService } from 'src/app/services/products.service';
import { ProductsBySection } from 'src/app/interfaces/products-by-section';
import { ProductsBySectionComponent } from 'src/app/components/products-by-section/products-by-section.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    HeaderComponent,
    IonContent,
    CommonModule,
    ProductsBySectionComponent
  ]
})
export class MenuPage {
  webSections!: ProductsBySection[];

  constructor(private _productsService: ProductsService) { 
    this.getProductsBySection('menu');
  }

  getProductsBySection(web:string){
    
      this._productsService.getProductsByWebSection(web).subscribe((results) => {
        this.webSections = results;
      });
  }

}
