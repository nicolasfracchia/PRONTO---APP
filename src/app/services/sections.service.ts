import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Section } from '../interfaces/section';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionsService {
  constructor( private http: HttpClient ) { }
  getWebOptions(){
    return ['menu','catering','orders'];
  }

  getSections(){
    return this.http.get<Section[]>(`${environment.apiURL}sections`);
  }
  getSection(id:number){
    return this.http.get<Section>(`${environment.apiURL}sections/${id}`);
  }
  updateSection(id:number, formData:FormData){
    return this.http.put<Section>(`${environment.apiURL}sections/${id}`,formData);
  }
  newSection(formData: FormData){
    return this.http.post<Section>(`${environment.apiURL}sections`,formData);
  }
  deleteSection(id:number){
    return this.http.delete<Section>(`${environment.apiURL}sections/${id}`);
  }
}
