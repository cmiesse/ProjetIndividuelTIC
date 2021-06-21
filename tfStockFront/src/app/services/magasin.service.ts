import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MagasinForm } from '../models/magasin.form';

import { Magasin } from '../models/magasin.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MagasinService {
  private API_URL = "http://localhost:8080/magasins"
  constructor(private client:HttpClient, private uService:UserService) { }

  getAllMagasins():Observable<Magasin[]>{
    return this.client.get(this.API_URL,{
      headers:{
      Authorization:this.uService.getUserInfo().token
    }}) as Observable<Magasin[]>
  }

  getMagasinById(id:number):Observable<Magasin>{
    return this.client.get(this.API_URL+"/"+id,{
      headers:{
      Authorization:this.uService.getUserInfo().token
    }}) as Observable<Magasin>
  }

  addMagasin(form:MagasinForm):Observable<Magasin>{
    return this.client.post(this.API_URL,form,{
      headers:{
      Authorization:this.uService.getUserInfo().token
    }}) as Observable<Magasin>
  }

  updateMagasin(form:MagasinForm, id:number):Observable<Magasin>{
    return this.client.put(this.API_URL+"/"+id+"/update",form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      } 
    }) as Observable<Magasin>;
  }

  deleteMagasin(id:number):Observable<Magasin>{
    return this.client.delete(this.API_URL+"/"+id+"/delete",{
      headers:{
      Authorization:this.uService.getUserInfo().token
    }}) as Observable<Magasin>
  }
}
