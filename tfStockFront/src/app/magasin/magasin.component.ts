import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Annonce } from '../models/annonce.model';
import { Magasin } from '../models/magasin.model';
import { ProduitPrix } from '../models/produitprix.model';
import { Ville } from '../models/ville.model';
import { AnnonceService } from '../services/annonce.service';
import { MagasinService } from '../services/magasin.service';
import { PrixService } from '../services/prix.service';
import { ProvinceService } from '../services/province.service';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-magasin',
  templateUrl: './magasin.component.html',
  styleUrls: ['./magasin.component.css']
})
export class MagasinComponent implements OnInit {
  updateForm:FormGroup;
  updateToggle:boolean=false;
  selectedMagasinId:number;
  magasinList:Magasin[]=[];
  provinceList:string[]=[];
  villeList:Ville[]=[];

  villeSelected:number=1;
  nbPattern:string="[0-9]{1,4}";
  annonceList:Annonce[]=[];
  prixList:ProduitPrix[]=[];
  constructor(private service:MagasinService, private pService:ProvinceService, builder:FormBuilder, 
    private vService: VilleService,private aService:AnnonceService, private proService:PrixService) {
    this.updateForm = builder.group({
      "name":new FormControl(null, Validators.required),
      "street":new FormControl(null, Validators.required),
      "number":new FormControl(null, Validators.required),
      "city":new FormControl("-", [Validators.required, Validators.pattern(this.nbPattern)]),
      "locationLink":new FormControl(null)
    })
   }

  ngOnInit(): void {
    this.aService.getAllAnnonces().subscribe((response)=>this.annonceList = response);
    this.proService.getAllPrix().subscribe((response)=>this.prixList = response);
    this.getAllMagasins();
    this.provinceList = this.pService.provinceList;
    this.getAllVilles();
  }
  getAllMagasins(){
    if(this.villeSelected == 1){
      this.service.getAllMagasins().subscribe((response)=>this.magasinList = response)
    } else{
      this.service.getAllMagasins().subscribe((response)=>{this.magasinList = response.filter(m=>m.city.postalCode == this.villeSelected)})
    } 
  }

  onVilleTableChange(newValue:number){
    this.getAllMagasins();
  }

  getAllVilles(){
    this.vService.getAllVilles().subscribe((response)=>this.villeList = response)
  }

  deleteMagasin(magasin:Magasin){
    this.service.deleteMagasin(magasin.id).subscribe((response)=>this.getAllMagasins(),(error)=>console.log(error))
  }

  toggleUpdate(magasin:Magasin){
    this.updateToggle = !this.updateToggle;
    this.selectedMagasinId = magasin.id;
    this.updateForm.setValue({"name":magasin.name, "street":magasin.street, "number":magasin.number, "city":magasin.city.postalCode, "locationLink":magasin.locationLink});
  }

  updateMagasin(){
    if(this.updateForm.valid){
      this.service.updateMagasin(this.updateForm.value, this.selectedMagasinId).subscribe((response)=>{
        this.updateForm.reset(),this.getAllMagasins(),this.updateToggle = !this.updateToggle, this.selectedMagasinId = null
      },(error)=>console.log(error))
    }
  }

  isMagasinDeletable(magasin:Magasin){
    return this.annonceList.filter(a=>a.shop.id==magasin.id).length == 0  && this.prixList.filter(p=>p.shop.id == magasin.id).length ==0? true: false;
  }
}
