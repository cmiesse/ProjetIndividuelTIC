import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TypeService } from 'src/app/services/type.service';
import { Type } from 'src/app/models/type.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-type',
  templateUrl: './new-type.component.html',
  styleUrls: ['./new-type.component.css']
})
export class NewTypeComponent implements OnInit {

  typeForm:FormGroup;
  constructor(private service:TypeService, builder:FormBuilder, private router:Router) { 
    this.typeForm = builder.group({
      "name":new FormControl(null, Validators.required)
    });
    
  }

  ngOnInit(): void {
  }

  addType(){
    if(this.typeForm.valid){
      this.service.addType(this.typeForm.value).subscribe((response)=>{this.typeForm.reset(), this.router.navigateByUrl("/types")})
    }
  }

}
