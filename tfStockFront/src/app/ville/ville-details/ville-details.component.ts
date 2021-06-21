import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Magasin } from 'src/app/models/magasin.model';
import { Ville } from 'src/app/models/ville.model';
import { MagasinService } from 'src/app/services/magasin.service';
import { ProvinceService } from 'src/app/services/province.service';
import { VilleService } from 'src/app/services/ville.service';

@Component({
  selector: 'app-ville-details',
  templateUrl: './ville-details.component.html',
  styleUrls: ['./ville-details.component.css']
})
export class VilleDetailsComponent implements OnInit {
  postalCode:number;
  ville:Ville;
  province:string;
  magasinList:Magasin[]=[];
  constructor(private route : ActivatedRoute, private service:VilleService, private mService:MagasinService, private pService:ProvinceService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{this.postalCode = params["id"],this.getVilleByPostalCode(this.postalCode), this.getProvinceByPostalCode(this.postalCode), this.getMagasinsByVille(this.postalCode)})
  }

  getVilleByPostalCode(postalCode:number){
    this.service.getVilleByPostalCode(postalCode).subscribe((response)=>this.ville = response,(error)=>console.log(error))
  }

  getMagasinsByVille(postalCode:number){
    this.mService.getAllMagasins().subscribe(
      (response)=>this.magasinList = response.filter(m=>m.city.postalCode == postalCode),
      (error)=>console.log(error))
  }

  getProvinceByPostalCode(postalCode:number){
    this.province = this.pService.getProvincebyPC(postalCode);
  }

}
