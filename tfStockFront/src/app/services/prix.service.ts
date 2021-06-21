import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitPrixForm } from '../models/produitprix.form';
import { ProduitPrix } from '../models/produitprix.model';
import { ProduitPrixKey } from '../models/produitprixkey.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PrixService {
  API_URL="http://localhost:8080/prix";
  constructor(private client:HttpClient, private uService:UserService) { }

  getAllPrix():Observable<ProduitPrix[]>{
    return this.client.get(this.API_URL, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<ProduitPrix[]>
  }
  
  getPrixById(id:ProduitPrixKey):Observable<ProduitPrix>{
    return this.client.get(this.API_URL+"/"+id.productId+"/"+id.shopId, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<ProduitPrix>
  }
  

  addPrix(form:ProduitPrixForm) : Observable<ProduitPrix>{
    return this.client.post(this.API_URL, form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<ProduitPrix>;

  }

  updatePrix(form:ProduitPrixForm):Observable<ProduitPrix>{
    return this.client.put(this.API_URL+"/"+form.product+"/"+form.shop+"/update", form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<ProduitPrix>;
  }

  deletePrix(id:ProduitPrixKey) : Observable<ProduitPrix>{
    return this.client.delete(this.API_URL+"/"+id.productId+"/"+id.shopId+"/delete", {
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<ProduitPrix>;

  }
}
