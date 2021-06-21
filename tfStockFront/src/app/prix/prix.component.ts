import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Magasin } from '../models/magasin.model';
import { Produit } from '../models/produit.model';
import { ProduitPrix } from '../models/produitprix.model';
import { MagasinService } from '../services/magasin.service';
import { PrixService } from '../services/prix.service';
import { ProduitService } from '../services/produit.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.css']
})
export class PrixComponent implements OnInit {
  
  updateForm:FormGroup;
  updateToggle:boolean = false;
  prixList:ProduitPrix[]=[];
  produitList:Produit[]=[];
  magasinList:Magasin[]=[];
  productTemp:Produit;
  shopTemp:Magasin;
  productFilter:number=0;
  shopFilter:number=0;
  nbPattern:string="[0-9]{1,4}";
  constructor(builder:FormBuilder, private service:PrixService, private pService:ProduitService, private mService:MagasinService, private uService:UserService) {
    this.updateForm = builder.group({
      'product':new FormControl(null,[Validators.required, Validators.pattern(this.nbPattern)]),
      'shop':new FormControl(null,[Validators.required, Validators.pattern(this.nbPattern)]),
      'price':new FormControl(null, Validators.required)
    })
   }  

  ngOnInit(): void {
    this.getAllProduits();
    this.getAllMagasins();
    this.getAllPrix();
  }

  getAllPrix(){
    if(this.productFilter == 0 && this.shopFilter == 0)
      this.service.getAllPrix().subscribe((response)=>{this.prixList = response},(error)=>{console.log(error)});
    else if(this.productFilter == 0 && this.shopFilter != 0)
    this.service.getAllPrix().subscribe((response)=>{this.prixList = response.filter(p=>p.shop.id == this.shopFilter)},(error)=>{console.log(error)});
    else if(this.productFilter != 0 && this.shopFilter == 0)
    this.service.getAllPrix().subscribe((response)=>{this.prixList = response.filter(p=>p.product.id == this.productFilter)},(error)=>{console.log(error)});
    else
    this.service.getAllPrix().subscribe((response)=>{this.prixList = response.filter(p=>p.shop.id == this.shopFilter && p.product.id == this.productFilter)},(error)=>{console.log(error)}); 
  }

  updatePrix(){
    if(this.updateForm.valid){
      this.service.updatePrix(this.updateForm.value).subscribe((response)=>{
        this.updateForm.reset(),this.getAllPrix(),this.updateToggle = !this.updateToggle, this.productTemp = null, this.shopTemp = null
      },(error)=>{console.log(error)})
    }
  }

  getAllProduits(){
    this.pService.getAllProducts().subscribe((response)=>{this.produitList = response});
  }

  getAllMagasins(){
    this.mService.getAllMagasins().subscribe((response)=>{this.magasinList = response});
  }

  toggleUpdate(prixProduit:ProduitPrix){
    this.updateToggle = !this.updateToggle;
    console.log(prixProduit);
    this.productTemp = prixProduit.product;
    this.shopTemp = prixProduit.shop;
    this.updateForm.setValue({"product":prixProduit.product.id, "shop":prixProduit.shop.id,"price":prixProduit.price});
  }

  deletePrix(prix:ProduitPrix){
    const id = {productId:prix.product.id, shopId:prix.shop.id}
    this.service.deletePrix(id).subscribe((response)=>{this.updateForm.reset(),console.log("Supprimé"), this.getAllPrix()}, (error)=>console.log(error))
  }
  isUserAdmin(){
    return this.uService.isUserAdmin();
  }
  onProductChange(newValue:number){
    this.getAllPrix();
  }

  onShopChange(newValue:number){
    this.getAllPrix();
  }
}
