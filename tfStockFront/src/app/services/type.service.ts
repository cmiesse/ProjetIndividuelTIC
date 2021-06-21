import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TypeForm } from '../models/type.form';
import { Type } from '../models/type.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  private API_URL = "http://localhost:8080/types"
  constructor(private client:HttpClient, private uService:UserService) { }

  getAllTypes():Observable<Type[]>{
    return this.client.get(this.API_URL) as Observable<Type[]>;
  }

  getTypeById(id:number):Observable<Type>{
    return this.client.get(this.API_URL+"/"+id,{
      headers:{
        Authorization: this.uService.getUserInfo().token
      }
    }) as Observable<Type>;
  }

  addType(form:TypeForm):Observable<Type>{
    return this.client.post(this.API_URL,form,{
      headers:{
        Authorization: this.uService.getUserInfo().token
      }
    }) as Observable<Type>
  }

  updateType(form:TypeForm, id:number):Observable<Type>{
    return this.client.put(this.API_URL+"/"+id+"/update",form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      } 
    }) as Observable<Type>;
  }

  deleteType(id:number):Observable<Type>{
    return this.client.delete(this.API_URL+"/"+id+"/delete",{
      headers:{
        Authorization: this.uService.getUserInfo().token
      }
    }) as Observable<Type>;
  }
}
