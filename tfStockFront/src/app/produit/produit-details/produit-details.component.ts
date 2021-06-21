import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-produit-details',
  templateUrl: './produit-details.component.html',
  styleUrls: ['./produit-details.component.css']
})
export class ProduitDetailsComponent implements OnInit {
  id:number;
  produit:Produit;
  constructor(private route:ActivatedRoute, private service:ProduitService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{this.id = params["id"],this.getProduitById(this.id)})
  }

  getProduitById(id:number){
    this.service.getProductById(id).subscribe((response)=>this.produit = response, (error)=>console.log(error))
  }

}
