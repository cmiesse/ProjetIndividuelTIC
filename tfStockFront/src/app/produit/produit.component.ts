import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Annonce } from '../models/annonce.model';
import { Produit } from '../models/produit.model';
import { ProduitPrix } from '../models/produitprix.model';
import { Type } from '../models/type.model';
import { User } from '../models/user.model';
import { AnnonceService } from '../services/annonce.service';
import { PrixService } from '../services/prix.service';
import { ProduitService } from '../services/produit.service';
import { TypeService } from '../services/type.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  updateForm:FormGroup;
  updateToggle:boolean = false;
  selectedProduitId:number;
  produitList:Produit[]=[];
  typeList:Type[]=[];
  typeSelected:number=0;
  produitForm:FormGroup;
  nbPattern:string="[0-9]{1,4}";
  annonceList:Annonce[]=[];
  prixList:ProduitPrix[]=[];
  userList:User[]=[];
  constructor(private service:ProduitService, builder:FormBuilder, private tService:TypeService,private aService:AnnonceService, private pService:PrixService, private uService:UserService) {
    this.updateForm = builder.group({
      "name":new FormControl(null, Validators.required),
      "link":new FormControl(null),
      "type":new FormControl("-",[Validators.required, Validators.pattern(this.nbPattern)])
    })
   }

  ngOnInit(): void {
    this.aService.getAllAnnonces().subscribe((response)=>this.annonceList = response);
    this.pService.getAllPrix().subscribe((response)=>this.prixList = response);
    this.uService.getAllUsers().subscribe((response)=>this.userList = response);
    this.getAllProduits();
    this.getAllTypes();
  }
  getAllProduits(){
    if(this.typeSelected == 0)
      this.service.getAllProducts().subscribe((response)=>this.produitList = response)
    else
    this.service.getAllProducts().subscribe((response)=>this.produitList = response.filter(p=>p.type.id == this.typeSelected))
  }

  getAllTypes(){
    this.tService.getAllTypes().subscribe((response)=>this.typeList = response);
  }

  onTypeChange(newValue:number){
    this.getAllProduits();
  }

  deleteProduit(produit:Produit){
    this.service.deleteProduit(produit.id).subscribe((response)=>this.getAllProduits(),(error)=>console.log(error))
  }

  toggleUpdate(produit:Produit){
    this.updateToggle = !this.updateToggle;
    this.selectedProduitId = produit.id;
    this.updateForm.setValue({"name":produit.name, "link":produit.link, "type":produit.type.id})
  }

  updateProduit(){
    if(this.updateForm.valid){
      this.service.updateProduit(this.updateForm.value, this.selectedProduitId).subscribe((response)=>{
        this.updateForm.reset(),this.getAllProduits(),this.updateToggle = !this.updateToggle, this.selectedProduitId = null
      }, (error)=>console.log(error))
    }
  }

  isProduitDeletable(produit:Produit){
    return this.annonceList.filter(a=>a.product.id==produit.id).length== 0 && 
    this.prixList.filter(p=>p.product.id==produit.id).length == 0 && 
    this.userList.filter(u=>u.chosenProducts.some(elem=>elem.id == produit.id)).length == 0 ? true: false;
  }

}
