import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitForm } from '../models/produit.form';
import { Produit } from '../models/produit.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private API_URL = "http://localhost:8080/produits"
  constructor(private client:HttpClient, private uService:UserService) { }

  getAllProducts():Observable<Produit[]>{
    return this.client.get(this.API_URL) as Observable<Produit[]>;
  }

  getProductById(id:number):Observable<Produit>{
    return this.client.get(this.API_URL+"/"+id,{
      headers:{
        Authorization: this.uService.getUserInfo().token
      }
    }) as Observable<Produit>;
  }

  addProduit(form:ProduitForm):Observable<Produit>{
    return this.client.post(this.API_URL,form,{
      headers:{
        Authorization: this.uService.getUserInfo().token
      }
    }) as Observable<Produit>
  }

  updateProduit(form:ProduitForm, id:number):Observable<Produit>{
    return this.client.put(this.API_URL+"/"+id+"/update",form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      } 
    }) as Observable<Produit>;
  }

  deleteProduit(id:number):Observable<Produit>{
    return this.client.delete(this.API_URL+"/"+id+"/delete",{
      headers:{
        Authorization: this.uService.getUserInfo().token
      }
    }) as Observable<Produit>
  }

}
