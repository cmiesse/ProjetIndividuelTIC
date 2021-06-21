import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../models/produit.model';
import { Type } from '../models/type.model';
import { User } from '../models/user.model';
import { Ville } from '../models/ville.model';
import { ProduitService } from '../services/produit.service';
import { TypeService } from '../services/type.service';
import { UserService } from '../services/user.service';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  profile:User;
 
  constructor(private service:UserService) {
   
   }

  ngOnInit(): void {
    
    this.getUserInfo();
  }

  getUserInfo(){
    this.profile = this.service.getUserInfo();
  }


}
