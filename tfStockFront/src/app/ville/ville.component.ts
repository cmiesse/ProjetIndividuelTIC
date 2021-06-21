import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Magasin } from '../models/magasin.model';
import { User } from '../models/user.model';
import { Ville } from '../models/ville.model';
import { MagasinService } from '../services/magasin.service';
import { ProvinceService } from '../services/province.service';
import { UserService } from '../services/user.service';
import { VilleService } from '../services/ville.service';

@Component({
  selector: 'app-ville',
  templateUrl: './ville.component.html',
  styleUrls: ['./ville.component.css']
})
export class VilleComponent implements OnInit {
  updateToggle:boolean = false;
  updateForm:FormGroup;
  villeList:Ville[]=[];
  provinceList:string[]=[];

  provinceSelected:string="all";
  pattern:string="[1-9][0-9]{3}";
  userList:User[]=[];
  shopList:Magasin[]=[];
  constructor(private service : VilleService, private pService: ProvinceService,builder:FormBuilder, private uService:UserService, private mService:MagasinService) {
    this.updateForm	=builder.group({
      "postalCode":new FormControl(null, [Validators.required, Validators.pattern(this.pattern)]),
      "name":new FormControl(null, Validators.required),
      "nameNL":new FormControl(null),
      "locationLink":new FormControl(null)
    })
   }

  ngOnInit(): void {
    this.uService.getAllUsers().subscribe((response)=>this.userList = response);
    this.mService.getAllMagasins().subscribe((response)=>this.shopList = response);
    this.provinceList = this.pService.provinceList;
    this.getAllVilles(this.provinceSelected);
  }

  getAllVilles(province:string){
    if(province == "all"){
      this.service.getAllVilles().subscribe(
        (response)=>this.villeList = response
      )
    } else{
      this.service.getAllVilles().subscribe(
        (response)=>this.villeList= response.filter(v=>this.pService.getProvincebyPC(v.postalCode) == province))
    }
    
  }

  onChange(newValue:string){
    this.getAllVilles(newValue);
    
  }

  getProvinceByPC(postalCode:number){
    return this.pService.getProvincebyPC(postalCode);
  }


  deleteVille(ville:Ville){
    this.service.deleteVille(ville.postalCode).subscribe((response)=>this.getAllVilles(this.provinceSelected),(error)=>console.log(error))
  }

  toggleUpdate(ville:Ville){
    this.updateToggle = !this.updateToggle;
    this.updateForm.setValue({"postalCode":ville.postalCode, "name":ville.name, "nameNL":ville.nameNL, "locationLink":ville.locationLink})
  }

  updateVille(){
    this.service.updateVille(this.updateForm.value, this.updateForm.value.postalCode).subscribe((response)=>{
      this.updateForm.reset(),this.getAllVilles(this.provinceSelected),this.updateToggle = !this.updateToggle
    },(error)=>console.log(error));
  }
  isVilleDeletable(ville:Ville){
    return this.userList.filter(u=>u.city.postalCode == ville.postalCode).length == 0 && this.shopList.filter(m=>m.city.postalCode == ville.postalCode).length == 0 ? true : false;
  }

}
