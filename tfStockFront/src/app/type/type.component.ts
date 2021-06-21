import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Produit } from '../models/produit.model';
import { Type } from '../models/type.model';
import { User } from '../models/user.model';
import { ProduitService } from '../services/produit.service';
import { TypeService } from '../services/type.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-type',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {
  updateForm:FormGroup;
  updateToggle:boolean=false;
  selectedTypeId:number;
  typeList:Type[]=[];
  produitList:Produit[]=[];
  userList:User[]=[];
  constructor(private service:TypeService, builder:FormBuilder, private pService:ProduitService, private uService:UserService) { 
    this.updateForm = builder.group({
      "name":new FormControl(null, Validators.required)
    })
  }

  ngOnInit(): void {
    this.pService.getAllProducts().subscribe((response)=>this.produitList = response);
    this.uService.getAllUsers().subscribe((response)=>this.userList = response);
    this.getAllTypes();
  }
  getAllTypes(){
    this.service.getAllTypes().subscribe((response)=>this.typeList = response)
  }


  deleteType(type:Type){
    this.service.deleteType(type.id).subscribe((response)=>this.getAllTypes(),(error)=>console.log(error));
  }

  toggleUpdate(type:Type){
    this.updateToggle = !this.updateToggle;
    this.selectedTypeId = type.id;
    this.updateForm.setValue({"name":type.name})
  }

  updateType(){
    if(this.updateForm.valid){
      this.service.updateType(this.updateForm.value,this.selectedTypeId).subscribe((response)=>{
        this.updateForm.reset(),this.getAllTypes(),this.updateToggle = !this.updateToggle, this.selectedTypeId = null
      }, (error)=>console.log(error))
    }
  }

  isTypeDeletable(type:Type){
    return this.produitList.filter(p=>p.type.id == type.id).length == 0 && this.userList.filter(u=>u.chosenTypes.some(elem=>elem.id==type.id)).length==0?true : false;
  }

  
}
