import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Annonce } from '../models/annonce.model';
import { MessageForm } from '../models/message.form';
import { Message } from '../models/message.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private API_URL = "http://localhost:8080/messages"
  constructor(private client:HttpClient, private uService:UserService) { }
  getAllMessages():Observable<Message[]>{
    return this.client.get(this.API_URL, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      }
    }) as Observable<Message[]>;
  }

  addMessage(form:MessageForm):Observable<Message>{
    return this.client.post(this.API_URL,form,{
      headers:{
      Authorization:this.uService.getUserInfo().token
    }}) as Observable<Message>
  }

  updateMessage(form:MessageForm, id:number):Observable<Message>{
    return this.client.put(this.API_URL+"/"+id+"/update",form, {
      headers:{
        Authorization:this.uService.getUserInfo().token
      } 
    }) as Observable<Message>;
  }

  deleteMessage(id:number):Observable<Message>{
    return this.client.delete(this.API_URL+"/"+id+"/delete",{
      headers:{
        Authorization:this.uService.getUserInfo().token
      } 
    }) as Observable<Message>;
  }
}
