import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from '../models/produit.model';
import { Type } from '../models/type.model';
import { Ville } from '../models/ville.model';
import { ProduitService } from '../services/produit.service';
import { TypeService } from '../services/type.service';
import { UserService } from '../services/user.service';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm:FormGroup;
  cityList:Ville[]=[];
  typeList:Type[]=[];
  productList:Produit[]=[];
  error:string;
  nbPattern:string="[0-9]{1,4}";
  constructor(builder:FormBuilder, private service:UserService, private router:Router, private vService:VilleService, private tService:TypeService, private pService:ProduitService) {
    this.signUpForm = builder.group({
      'username':new FormControl(null, Validators.required),
      'password':new FormControl(null, Validators.required),
      'firstName':new FormControl(null, Validators.required),
      'lastName':new FormControl(null, Validators.required),
      'email':new FormControl(null, [Validators.required,Validators.email]),
      'city': new FormControl("-", [Validators.required, Validators.pattern(this.nbPattern)]),
      'chosenTypes':new FormControl([]),
      'chosenProducts':new FormControl([]),
    })
   }

  ngOnInit(): void {
    this.getCities();
    this.getTypes();
    this.getProducts();
  }
  signUp(){
    if(this.signUpForm.valid){
      this.service.signUp(this.signUpForm.value).subscribe(
        (response)=>{this.error = null,this.signUpForm.reset(), console.log(response.username + " s'est inscrit"),this.router.navigateByUrl("")},
        (error)=>{this.error = error.error}
      )
    }
    
  }

  getCities(){
    this.vService.getAllVilles().subscribe(
      (response)=>{this.cityList = response},
      (error)=>console.log(error)
    )
  }

  getTypes(){
    this.tService.getAllTypes().subscribe(
      (response)=>{this.typeList =response},
      (error)=>console.log(error)
    )
  }

  getProducts(){
    this.pService.getAllProducts().subscribe(
      (response)=>{this.productList=response},
      (error)=>console.log(error)
      )
  }
    

}
