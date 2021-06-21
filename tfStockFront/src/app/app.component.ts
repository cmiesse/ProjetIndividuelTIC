import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tfStockFront';
  constructor(private uService:UserService){

  }

  isLogged(){
    return this.uService.isLogged();
  }
}
