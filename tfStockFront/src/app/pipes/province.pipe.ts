import { Pipe, PipeTransform } from '@angular/core';
import { Ville } from '../models/ville.model';
import { ProvinceService } from '../services/province.service';

@Pipe({
  name: 'province'
})
export class ProvincePipe implements PipeTransform {

  constructor(private service:ProvinceService){}
  transform(villeList: Ville[], province:string): Ville[] {
    return villeList.filter(v=>this.service.getProvincebyPC(v.postalCode) == province);
  }

}
