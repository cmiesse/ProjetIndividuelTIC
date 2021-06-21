import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'src/app/models/message.model';
import { User } from 'src/app/models/user.model';
import { MessageService } from 'src/app/services/message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit {
  @Output('out')
  addEvent = new EventEmitter<Message>();
  messageForm:FormGroup;
  user:number;
  constructor(private uService:UserService, private service:MessageService, builder:FormBuilder) {
    this.messageForm = builder.group({
      "message":new FormControl(null, Validators.required),
      "user":new FormControl(this.uService.getUserInfo().id, Validators.required)
    })
   }

  ngOnInit(): void {
    this.user = this.uService.getUserInfo().id
  }

  addMessage(){
    if(this.messageForm.valid){
      this.service.addMessage(this.messageForm.value).subscribe((response)=>{this.addEvent.emit(this.messageForm.value),this.messageForm.reset()},(error)=>console.log(error))
    }
  }

  preCompleteMessage(objet:string){
    this.messageForm.setValue({"message":null, "user":this.user});
    if(objet == "magasin")
      this.messageForm.setValue({"message":" - Magasin - \n\nNom: \nRue: \nN°: \nVille: \n", "user":this.user});
    else if(objet == "ville")
      this.messageForm.setValue({"message":" - Ville - \n\nNom: \nCode postal: ", "user":this.user});
    else if(objet == "type")
      this.messageForm.setValue({"message":" - Type - \n\nNom: ", "user":this.user});
    else if(objet == "produit")
      this.messageForm.setValue({"message":" - Produit - \n\nNom: \nType: ", "user":this.user});
    else if(objet == "prix")
      this.messageForm.setValue({"message":" - Prix - \n\nMagasin: \nProduit: \nPrix: ", "user":this.user});
    else
      this.messageForm.setValue({"message":null, "user":this.user});
    
  }

}
