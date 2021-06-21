import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  signInForm:FormGroup;
  error:string;
  constructor(builder:FormBuilder, private service:UserService) {
    this.signInForm = builder.group({
      'username':new FormControl(null, Validators.required),
      'password':new FormControl(null, Validators.required)
    })
   }

  ngOnInit(): void {
  }
  signIn(){
    if(this.signInForm.valid){
      this.service.signIn(this.signInForm.value).subscribe(
        (response)=>{this.error = null, this.signInForm.reset(), console.log(response.username + " s'est connecté")},
        (error)=>{this.error = error.error}
      )
    }
    
  }

  isLogged(){
    return this.service.isLogged();
  }

}
