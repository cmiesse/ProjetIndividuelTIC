import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  pwdForm:FormGroup;
  error:string;
  constructor(builder:FormBuilder, private uService:UserService, private router:Router) {
    this.pwdForm = builder.group({
      "oldPwd":new FormControl(null,Validators.required),
      "newPwd":new FormControl(null,[Validators.required, Validators.minLength(4)]),
      "confirmation":new FormControl(null,[Validators.required, Validators.minLength(4)]),
      "user": new FormControl(this.uService.getUserInfo().id)
    })
   }

  ngOnInit(): void {
  }

  changePassword(){
    this.uService.changePassword(this.pwdForm.value).subscribe((response)=>{this.error = null,this.pwdForm.reset(),this.router.navigateByUrl("/profil")},(error)=>{this.error = error.error})
  }

}
