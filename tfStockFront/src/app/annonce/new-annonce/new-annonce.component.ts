import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Magasin } from 'src/app/models/magasin.model';
import { Produit } from 'src/app/models/produit.model';
import { Ville } from 'src/app/models/ville.model';
import { AnnonceService } from 'src/app/services/annonce.service';
import { MagasinService } from 'src/app/services/magasin.service';
import { ProduitService } from 'src/app/services/produit.service';
import { ProvinceService } from 'src/app/services/province.service';
import { UserService } from 'src/app/services/user.service';
import { VilleService } from 'src/app/services/ville.service';

@Component({
  selector: 'app-new-annonce',
  templateUrl: './new-annonce.component.html',
  styleUrls: ['./new-annonce.component.css']
})
export class NewAnnonceComponent implements OnInit {
  annonceForm:FormGroup;
  quantityList: string[] = ["vide","peu","beaucoup"];
  productList:Produit[]=[];
  villeList:Ville[]=[];
  shopList:Magasin[]=[];
  city:number=0;
  provinceList:string[]=[];
  nbPat:string="[0-9]{1,4}";
  qtPat:string="[^-]*";
  constructor(builder:FormBuilder, private uService:UserService, 
    private pService: ProduitService, private mService:MagasinService, 
    private service:AnnonceService, private router:Router,
    private proService:ProvinceService, private vService:VilleService) { 
    this.annonceForm = builder.group({
      "quantity":new FormControl("-", [Validators.required, Validators.pattern(this.qtPat)]),
      "product":new FormControl("-", [Validators.required, Validators.pattern(this.nbPat)]),
      "user":new FormControl(this.uService.getUserInfo().id, Validators.required),
      "shop":new FormControl("-", [Validators.required, Validators.pattern(this.nbPat)]),
    })
  }

  ngOnInit(): void {
    this.getAllMagasins(0);
    this.getAllProduits();
    this.provinceList = this.proService.provinceList;
    this.getAllVilles();
  }

  getAllProduits(){
    this.pService.getAllProducts().subscribe((response)=>this.productList = response);
  }

  getAllMagasins(postalCode:number){
    if(postalCode == 0)
      this.mService.getAllMagasins().subscribe((response)=>this.shopList = response);
    else
      this.mService.getAllMagasins().subscribe((response)=>this.shopList = response.filter(m=>m.city.postalCode == postalCode));
  }

  getAllVilles(){
    this.vService.getAllVilles().subscribe((response=>this.villeList = response));
  }

  onVilleChange(newValue:number){
    this.annonceForm.setValue({shop:"-", quantity:this.annonceForm.value.quantity, product:this.annonceForm.value.product, user:this.annonceForm.value.user});
    this.getAllMagasins(newValue);
  }

  isFormInvalid(){
    return this.annonceForm.invalid || this.annonceForm.value.quantity == '-' ||  this.annonceForm.value.product == '-' || this.annonceForm.value.shop == '-';
  }

  submitForm(){
    if(this.annonceForm.valid && this.annonceForm.value.quantity != "-" &&  this.annonceForm.value.product != "-" && this.annonceForm.value.shop != "-"){
      this.service.addAnnonce(this.annonceForm.value).subscribe((response)=>{this.annonceForm.reset(), console.log(response),this.router.navigateByUrl("/annonces")},(error)=>console.log(error))
    }
    else console.log("Incomplet");
    
  }

  isUserCity(ville:Ville){
    var userCity= this.uService.getUserInfo().city;
    return JSON.stringify(userCity)===JSON.stringify(ville);
  }

}
