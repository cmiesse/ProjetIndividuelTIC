import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Magasin } from 'src/app/models/magasin.model';
import { Produit } from 'src/app/models/produit.model';
import { ProduitPrix } from 'src/app/models/produitprix.model';
import { MagasinService } from 'src/app/services/magasin.service';
import { PrixService } from 'src/app/services/prix.service';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-new-prix',
  templateUrl: './new-prix.component.html',
  styleUrls: ['./new-prix.component.css']
})
export class NewPrixComponent implements OnInit {
  prixForm:FormGroup;
  produitList:Produit[]=[];
  magasinList:Magasin[]=[];
  error:string;
  nbPattern:string="[0-9]{1,4}";
  
  constructor(builder:FormBuilder, private service:PrixService, private pService:ProduitService, private mService:MagasinService, private router:Router) {
    this.prixForm = builder.group({
      'product':new FormControl("-",[Validators.required, Validators.pattern(this.nbPattern)]),
      'shop':new FormControl("-",[Validators.required, Validators.pattern(this.nbPattern)]),
      'price':new FormControl(null, Validators.required)
    })
   }

  ngOnInit(): void {
    this.getAllMagasins();
    this.getAllProduits();
  }

  addPrix(){
    if(this.prixForm.valid){
      this.service.addPrix(this.prixForm.value).subscribe((response)=>{
        this.error = null,this.prixForm.reset(),this.prixForm.setValue({"product":"-","shop":"-","price":null}), this.router.navigateByUrl("/prix")
      },(error)=>this.error = error.error)
    }
  }

  getAllProduits(){
    this.pService.getAllProducts().subscribe((response)=>{this.produitList = response});
  }

  getAllMagasins(){
    this.mService.getAllMagasins().subscribe((response)=>{this.magasinList = response});
  }

}
