import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Ville } from 'src/app/models/ville.model';
import { VilleService } from 'src/app/services/ville.service';

@Component({
  selector: 'app-new-ville',
  templateUrl: './new-ville.component.html',
  styleUrls: ['./new-ville.component.css']
})
export class NewVilleComponent implements OnInit {

  villeForm:FormGroup;
  pattern:string="[1-9][0-9]{3}";
  constructor(private service : VilleService,builder:FormBuilder, private router:Router) {
    this.villeForm = builder.group({
      "postalCode":new FormControl(null, [Validators.required, Validators.pattern(this.pattern),Validators.min(1000),Validators.max(9999)]),
      "name":new FormControl(null, Validators.required),
      "nameNL":new FormControl(null),
      "locationLink":new FormControl(null)
    });
    
   }
  ngOnInit(): void {
  }

  addVille(){
    if(this.villeForm.valid){
      this.service.addVille(this.villeForm.value).subscribe((response)=>{this.villeForm.reset(), this.router.navigateByUrl("/villes")})
    }
  }

}
