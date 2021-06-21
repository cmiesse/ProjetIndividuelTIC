import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(private uService : UserService, private router:Router) { }

  ngOnInit(): void {
  }

  open(){
  const navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("open");
  
  }
  isLogged(){
    return this.uService.isLogged();

  }

  logout(){
    this.uService.logout();
    this.router.navigateByUrl("");
    this.open();
  }

  isUserAdmin(){
    return this.uService.isUserAdmin();
  }

}
