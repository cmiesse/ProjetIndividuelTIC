import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Magasin } from 'src/app/models/magasin.model';
import { MagasinService } from 'src/app/services/magasin.service';

@Component({
  selector: 'app-magasin-details',
  templateUrl: './magasin-details.component.html',
  styleUrls: ['./magasin-details.component.css']
})
export class MagasinDetailsComponent implements OnInit {
  id:number;
  magasin:Magasin;
  constructor(private route:ActivatedRoute, private service:MagasinService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{this.id = params["id"],this.getMagasinById(this.id)});
    
  }

  getMagasinById(id:number){
    this.service.getMagasinById(id).subscribe((response)=>this.magasin = response, (error)=>console.log(error))
  }

}
