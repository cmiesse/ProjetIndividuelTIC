import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ville } from '../models/ville.model';
import { ProvinceService } from './province.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class VilleService {
  private API_URL = "http://localhost:8080/villes"
  constructor(private client:HttpClient, private pService:ProvinceService, private uService:UserService) { }

  getAllVilles():Observable<Ville[]>{
    return this.client.get(this.API_URL) as Observable<Ville[]>;
  }

  getVilleByPostalCode(postalCode:number):Observable<Ville>{
    return this.client.get(this.API_URL+"/"+postalCode,{
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Ville>
  }

  addVille(ville:Ville):Observable<Ville>{
    return this.client.post(this.API_URL,ville,{
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Ville>
  }

  updateVille(form:Ville, id:number):Observable<Ville>{
    return this.client.put(this.API_URL+"/"+id+"/update",form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      } 
    }) as Observable<Ville>;
  }

  deleteVille(id:number):Observable<Ville>{
    return this.client.delete(this.API_URL+"/"+id+"/delete",{
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Ville>
  }

}
