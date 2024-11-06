import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor( private http: HttpClient ) { }

  getCategories(){
    return this.http.get<Category[]>(`${environment.apiURL}categories`);
  }
  getCategory(id:number){
    return this.http.get<Category>(`${environment.apiURL}categories/${id}`);
  }
  updateCategory(id:number, formData:FormData){
    return this.http.put<Category>(`${environment.apiURL}categories/${id}`,formData);
  }
  newCategory(formData: FormData){
    return this.http.post<Category>(`${environment.apiURL}categories`,formData);
  }
  deleteCategory(id:number){
    return this.http.delete<Category>(`${environment.apiURL}categories/${id}`);
  }
}
