import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductsBySection } from '../interfaces/products-by-section';
import { Product } from '../interfaces/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor( private http: HttpClient ) { }

  getProductsByWebSection(web:string){
    return this.http.get<ProductsBySection[]>(`${environment.apiURL}products/sections/${web}`);
  }

  /* ***** CMS ***** */

  // PRODUCTS
  getAllProducts(){
    return this.http.get<Product[]>(`${environment.apiURL}products`);
  }
  getProduct(id:number){
    return this.http.get<Product>(`${environment.apiURL}products/${id}`);
  }
  updateProduct(id:number, formData:FormData){
    return this.http.put<Product>(`${environment.apiURL}products/${id}`,formData);
  }
  newProduct(formData: FormData){
    return this.http.post<Product>(`${environment.apiURL}products`,formData);
  }
  deleteProduct(id:number){
    return this.http.delete<Product>(`${environment.apiURL}products/${id}`);
  }

  // PRICES
  newProductPrice(idProduct:number, formData:any){
    return this.http.post<any>(`${environment.apiURL}products/prices/${idProduct}`,formData);
  }
  updateProductPrice(id:number, formData:FormData){
    return this.http.put<any>(`${environment.apiURL}products/prices/${id}`,formData);
  }
  deletePrice(id:number){
    return this.http.delete<any>(`${environment.apiURL}products/prices/${id}`);
  }
}
