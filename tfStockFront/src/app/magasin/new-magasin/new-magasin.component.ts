import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Magasin } from 'src/app/models/magasin.model';
import { Ville } from 'src/app/models/ville.model';
import { MagasinService } from 'src/app/services/magasin.service';
import { ProvinceService } from 'src/app/services/province.service';
import { VilleService } from 'src/app/services/ville.service';

@Component({
  selector: 'app-new-magasin',
  templateUrl: './new-magasin.component.html',
  styleUrls: ['./new-magasin.component.css']
})
export class NewMagasinComponent implements OnInit {
  magasinForm:FormGroup;
  nbPattern:string="[0-9]{1,4}";
  provinceList:string[]=[];
  villeList:Ville[]=[];
  constructor(private service:MagasinService,private pService:ProvinceService, builder:FormBuilder, 
    private vService: VilleService, private router:Router) {
    this.magasinForm = builder.group({
      "name":new FormControl(null, Validators.required),
      "street":new FormControl(null, Validators.required),
      "number":new FormControl(null, Validators.required),
      "city":new FormControl("-", [Validators.required, Validators.pattern(this.nbPattern)]),
      "locationLink":new FormControl(null)
    });
    
   }

  ngOnInit(): void {
    this.provinceList = this.pService.provinceList;
    this.getAllVilles();
  }

  addMagasin(){
    if(this.magasinForm.valid && this.magasinForm.value.city != "-"){
      this.service.addMagasin(this.magasinForm.value).subscribe((response)=>{this.magasinForm.reset(),
      this.magasinForm.setValue({"name":null,"street":null,"number":null,"city":"-","locationLink":null}), this.router.navigateByUrl("/magasins")})
    }
  }

  getAllVilles(){
    this.vService.getAllVilles().subscribe((response)=>this.villeList = response)
  }

}
