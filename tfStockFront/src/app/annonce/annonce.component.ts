import { Component, OnInit } from '@angular/core';
import { Annonce } from '../models/annonce.model';
import { Magasin } from '../models/magasin.model';
import { Produit } from '../models/produit.model';
import { Type } from '../models/type.model';
import { Ville } from '../models/ville.model';
import { AnnonceService } from '../services/annonce.service';
import { MagasinService } from '../services/magasin.service';
import { PrixService } from '../services/prix.service';
import { ProduitService } from '../services/produit.service';
import { ProvinceService } from '../services/province.service';
import { TypeService } from '../services/type.service';
import { UserService } from '../services/user.service';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.component.html',
  styleUrls: ['./annonce.component.css']
})
export class AnnonceComponent implements OnInit {
  annonceList:Annonce[]=[];
  typeList:Type[]=[];
  selectedTypes:string[]=[];
  produitList:Produit[]=[];
  selectedProduits:string[]=[];
  provinceList:string[]=[];
  selectedProvince:string="all";
  villeList:Ville[]=[];
  villeSelected:number=0;
  auteurSelected:number=0;
  magasinList:Magasin[]=[];
  quantity:string="all";
  product:number=0;
  shop:number=0;
  order:number=0;
  functionsSort=[function(a,b){var date1 = a.createdAt;
    var date2 = b.createdAt;
    if(date1 > date2){
      return -1;
    }
    else if(date1==date2){
      return 0;
    }
    else{
      return 1;
    }}, function(a,b){
      var date1 = a.createdAt;
      var date2 = b.createdAt;
      if(date1 < date2){
        return -1;
      }
      else if(date1==date2){
        return 0;
      }
      else{
        return 1;
      }
    }]
  constructor(private service:AnnonceService,
     private uService:UserService, 
     private tService:TypeService, 
     private pService:ProduitService,
     private proService: ProvinceService,
     private vService:VilleService,
     private mService:MagasinService,
     private ppService:PrixService
     ) {  }

  ngOnInit(): void {
    this.getAllTypes(true);
    this.getAllProduits(true);
    this.getAllAnnoncesSorted();
    this.provinceList = this.proService.provinceList;
    this.getAllVilles();
    this.getAllMagasins(0);
  }

  getAllAnnoncesSorted(){  
    if(this.quantity=="all" && this.auteurSelected==0 && this.villeSelected == 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=> {this.annonceList = response.filter(a=>this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type)).sort(this.functionsSort[this.order]),
      this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))}) //1
    }
    else if(this.quantity=="all" && this.auteurSelected==0 && this.villeSelected == 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))}) //2
    }
    else if(this.quantity=="all" && this.auteurSelected==0 && this.villeSelected != 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.shop.city.postalCode == this.villeSelected && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))}) //3
    }
    else if(this.quantity=="all" && this.auteurSelected==0 && this.villeSelected != 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.shop.city.postalCode == this.villeSelected && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))}) //4
    }
    else if(this.quantity=="all" && this.auteurSelected!=0 && this.villeSelected == 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.user.id==this.auteurSelected && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))}) //5
    }
    else if(this.quantity=="all" && this.auteurSelected!=0 && this.villeSelected == 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.user.id==this.auteurSelected && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity=="all" && this.auteurSelected!=0 && this.villeSelected != 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.user.id==this.auteurSelected && a.shop.city.postalCode == this.villeSelected && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity=="all" && this.auteurSelected!=0 && this.villeSelected != 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.user.id==this.auteurSelected && a.shop.city.postalCode == this.villeSelected && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected==0 && this.villeSelected == 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected==0 && this.villeSelected == 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected==0 && this.villeSelected != 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.shop.city.postalCode == this.villeSelected && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected==0 && this.villeSelected != 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.shop.city.postalCode == this.villeSelected && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected!=0 && this.villeSelected == 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.user.id==this.auteurSelected && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected!=0 && this.villeSelected == 0 && this.shop != 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.user.id==this.auteurSelected && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else if(this.quantity!="all" && this.auteurSelected!=0 && this.villeSelected != 0 && this.shop == 0){
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.user.id==this.auteurSelected && a.shop.city.postalCode == this.villeSelected && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
    else{
      this.service.getAllAnnonces().subscribe((response)=>{
        this.annonceList = response.filter(a=>a.quantity == this.quantity && a.user.id==this.auteurSelected && a.shop.city.postalCode == this.villeSelected && a.shop.id == this.shop && (this.isProduitSelected(this.selectedProduits,a.product) || this.isTypeSelected(this.selectedTypes, a.product.type))).sort(this.functionsSort[this.order]),
        this.annonceList.map(a => this.ppService.getPrixById({productId:a.product.id, shopId:a.shop.id}).subscribe((response)=>response == null ? a.price=null : a.price = response.price))})
    }
  
    
  }

  getAllTypes(start:boolean){
    if(start){
      var userTypes = this.uService.getUserInfo().chosenTypes.map(t=>""+t.id);
      this.tService.getAllTypes().subscribe((response)=>{this.typeList = response,
      userTypes!=[]?this.selectedTypes = userTypes:this.selectedTypes = this.typeList.map(t=>""+t.id)})
    } else{
      this.tService.getAllTypes().subscribe((response)=>this.typeList = response)
    }
  }

  onTypesChange(newValue:number){
    this.getAllAnnoncesSorted();
    
  }

  getAllProduits(start:boolean){
    if(start){
      var userProducts = this.uService.getUserInfo().chosenProducts.map(p=>""+p.id);
      this.pService.getAllProducts().subscribe((response)=>{this.produitList = response,
      userProducts !=[]?this.selectedProduits = userProducts:this.selectedProduits = this.produitList.map(p=>""+p.id)})
    }else{
      this.pService.getAllProducts().subscribe((response)=>this.produitList = response)
    }
    
  }

  onProduitsChange(newValue:number){
    this.getAllAnnoncesSorted();
  }

  getAllVilles(){
    this.vService.getAllVilles().subscribe((response)=>this.villeList=response)
  }

  getAllMagasins(postalCode:number){
    postalCode == 0?
    this.mService.getAllMagasins().subscribe((response)=>this.magasinList = response)  :
    this.mService.getAllMagasins().subscribe((response)=>this.magasinList = response.filter(m=>m.city.postalCode==postalCode));
   
  }

  onQuantityChange(newValue:string){
    this.getAllAnnoncesSorted();
  }

  onAuteurChange(newValue:number){
    this.getAllAnnoncesSorted();
  }

  onVilleChange(newValue:number){
    this.shop = 0;
    this.getAllMagasins(newValue);
    this.getAllAnnoncesSorted();
  }

  onMagasinChange(newValue:number){
    this.getAllAnnoncesSorted();
  }

  onOrderChange(newValue:number){
    this.getAllAnnoncesSorted();
  }

  isUserAdmin(){
    return this.uService.isUserAdmin();
  }

  getUserId(){
    return this.uService.getUserInfo().id;
  }

  isUserType(type:Type){
    var userTypes = this.uService.getUserInfo().chosenTypes;
    return userTypes.some(elem=>{
      return JSON.stringify(type) === JSON.stringify(elem)
    })
  }

  isTypeSelected(liste:string[],type:Type){
    return liste.some(elem => {
      return ""+type.id === elem
    })
  }

  isUserProduit(produit:Produit){
    var userProducts = this.uService.getUserInfo().chosenProducts;
    return  userProducts.some(elem=>{
      return JSON.stringify(produit) === JSON.stringify(elem)
    })
  }

  isProduitSelected(liste:string[],produit:Produit){
    return liste.some(elem => {
      return ""+produit.id === elem
    })
  }

  isUserCity(ville:Ville){
    var userCity= this.uService.getUserInfo().city;
    return JSON.stringify(userCity)===JSON.stringify(ville);
  }
  deleteAnnonce(annonce:Annonce){
    this.service.deleteAnnonce(annonce.id).subscribe((response)=>this.getAllAnnoncesSorted(),(error)=>console.log(error))
  }
  
}
