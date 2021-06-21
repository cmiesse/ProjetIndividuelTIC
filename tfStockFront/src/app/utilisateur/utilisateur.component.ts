import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/annonce.model';
import { Message } from '../models/message.model';
import { User } from '../models/user.model';
import { AnnonceService } from '../services/annonce.service';
import { MessageService } from '../services/message.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  userList:User[]=[];
  annonceList:Annonce[]=[];
  messageList:Message[]=[];
  constructor(private service:UserService, private aService:AnnonceService, private mService:MessageService) { }

  ngOnInit(): void {
    this.aService.getAllAnnonces().subscribe((response)=>this.annonceList =response);
    this.mService.getAllMessages().subscribe((response)=>this.messageList = response);
    this.getAllUsers();
  }

  getAllUsers(){
    this.service.getAllUsers().subscribe((response)=>this.userList = response)
  }

  isUserDeletable(user:User){
    return this.annonceList.filter(a=>a.user.id == user.id).length == 0 && this.messageList.filter(m=>m.user.id == user.id).length == 0 ? true : false;
  }

  deleteUser(user:User){
    this.service.delete(user.id).subscribe((response)=>this.getAllUsers());
  }


}
