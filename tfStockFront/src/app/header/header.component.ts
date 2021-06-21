import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username:string;
  constructor(private uService:UserService, private router:Router) { }

  ngOnInit(): void {}

  getUsername(){
    return this.uService.getUserInfo().username;
  }

  isLogged(){
    return this.uService.isLogged()
  }

  logout(){
    this.uService.logout();
  }

}
