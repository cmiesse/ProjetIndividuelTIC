import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePasswordForm } from '../models/changePassword.form';
import { LoginForm } from '../models/login.form';
import { SignUpForm } from '../models/sign-up.form';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private API_URL = "http://localhost:8080/users";
  
  constructor(private client: HttpClient) { }
  signUp(form:SignUpForm):Observable<User>{
    return this.client.post(this.API_URL+"/sign_up",form
    ) as Observable<User>;
  }

  signIn(form:LoginForm):Observable<User>{
    let obs = this.client.post(this.API_URL+"/sign_in",form);
    obs.subscribe(
      (response)=>{
        sessionStorage.setItem("user",JSON.stringify(response));
      })
    return obs as Observable<User>;
  }

  getAllUsers():Observable<User[]>{
    return this.client.get(this.API_URL,{
      headers:{
        Authorization: this.getUserInfo().token
      }
    }) as Observable<User[]>
  }

  logout(){
    sessionStorage.removeItem("user");
  }

  isLogged(){
    return sessionStorage.getItem("user") != null;
  }

  getUserInfo(): null | User {
    if( !this.isLogged() )
      return null;

      return JSON.parse(sessionStorage.getItem("user"));   
  }

  isUserAdmin(){
    return this.getUserInfo().roles.includes("ROLE_ADMIN");
  }

  changePassword(form:ChangePasswordForm):Observable<User>{
    return this.client.put(this.API_URL+"/changePassword",form,{
      headers:{
        Authorization: this.getUserInfo().token
      }
    }) as Observable<User>;
  }

  delete(id:number):Observable<User>{
    return this.client.delete(this.API_URL+"/"+id,{
      headers:{
        Authorization: this.getUserInfo().token
      }
    }) as Observable<User>;
  }
}
