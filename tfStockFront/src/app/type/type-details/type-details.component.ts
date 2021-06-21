import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { Type } from 'src/app/models/type.model';
import { ProduitService } from 'src/app/services/produit.service';
import { TypeService } from 'src/app/services/type.service';

@Component({
  selector: 'app-type-details',
  templateUrl: './type-details.component.html',
  styleUrls: ['./type-details.component.css']
})
export class TypeDetailsComponent implements OnInit {
  id:number;
  type:Type;
  produitList:Produit[]=[];
  constructor(private route : ActivatedRoute, private service:TypeService, private pService:ProduitService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.id = params["id"],
        this.getTypeById(this.id),
        this.getAllProduitsByType(this.id)
      })
    
  }

  getTypeById(id:number){
    this.service.getTypeById(id).subscribe((response)=>this.type = response,(error)=>console.log(error))
  }

  getAllProduitsByType(id:number){
    this.pService.getAllProducts().subscribe(
    (response)=>{this.produitList = response.filter(p=>p.type.id==id),console.log(this.produitList)},
    (error)=>console.log(error))
  }

}
