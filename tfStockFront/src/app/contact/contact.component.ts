import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from '../models/message.model';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  messageList:Message[]=[];

  etat:string="all";
  constructor(private uService:UserService, private service:MessageService) {
    
   }

  ngOnInit(): void {
    this.getAllMessages();
  }

  getAllMessages(){
    if(this.etat == "all")
      this.service.getAllMessages().subscribe((response)=>{this.messageList = response})
    else if(this.etat == "true")
      this.service.getAllMessages().subscribe((response)=>{this.messageList = response.filter(m=>m.done == true)})
    else
      this.service.getAllMessages().subscribe((response)=>{this.messageList = response.filter(m=>m.done == false)})
  }

  onEtatChange(newValue:string){
    this.getAllMessages();
  }

  onAdd(toAdd:Message){
    this.getAllMessages();
  }

  updateMessage(message:Message){
    var form= {message:message.message, user:message.user.id,done:message.done};
    this.service.updateMessage(form, message.id).subscribe((response)=>{this.getAllMessages()},(error)=>console.log(error));
  }

  isUserAdmin(){
    return this.uService.isUserAdmin();
  }

  deleteMessage(message:Message){
    this.service.deleteMessage(message.id).subscribe((response)=>{console.log("Message supprimé"), this.getAllMessages()},(error)=>console.log(error))
  }

}
