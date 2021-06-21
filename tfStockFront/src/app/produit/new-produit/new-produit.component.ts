import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { Type } from 'src/app/models/type.model';
import { ProduitService } from 'src/app/services/produit.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.css']
})
export class NewProduitComponent implements OnInit {
  typeList:Type[]=[];
  produitForm:FormGroup;
  nbPattern:string="[0-9]{1,4}";
  constructor(private service:ProduitService, builder:FormBuilder, private tService:TypeService, private router:Router) {
    this.produitForm = builder.group({
      "name":new FormControl(null, Validators.required),
      "link":new FormControl(null),
      "type":new FormControl("-",[Validators.required, Validators.pattern(this.nbPattern)])
    });
    
   }

  ngOnInit(): void {
    this.getAllTypes();
  }

  addProduit(){
    if(this.produitForm.valid && this.produitForm.value.type != "-"){
      this.service.addProduit(this.produitForm.value).subscribe((response)=>{this.produitForm.reset(), this.produitForm.setValue({"name":null, "link":null,"type":"-"}), this.router.navigateByUrl("/produits")})
    }
  }

  getAllTypes(){
    this.tService.getAllTypes().subscribe((response)=>this.typeList = response);
  }

}
