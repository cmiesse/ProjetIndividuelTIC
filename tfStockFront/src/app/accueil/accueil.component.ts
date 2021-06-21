import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  constructor(private service:UserService) { }

  ngOnInit(): void {
  }

  isLogged(){
    return this.service.isLogged();
  }

  isUserAdmin(){
    return this.service.isUserAdmin();
  }
  
}
