import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce.model';
import { AnnonceForm } from '../models/annonce.form';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AnnonceService {
  private API_URL = "http://localhost:8080/annonces"
  constructor(private client : HttpClient, private uService:UserService) { }
  getAllAnnonces():Observable<Annonce[]>{
    return this.client.get(this.API_URL,{
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Annonce[]>;
  }

  addAnnonce(form:AnnonceForm):Observable<Annonce>{
    return this.client.post(this.API_URL,form,{
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Annonce>;
  }

  deleteAnnonce(id:number):Observable<Annonce>{
    return this.client.delete(this.API_URL+"/"+id+"/delete",{
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Annonce>;
  }

}
