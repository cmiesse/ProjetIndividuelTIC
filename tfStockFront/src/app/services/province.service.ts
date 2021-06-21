import { Injectable } from '@angular/core';
import { MagasinService } from './magasin.service';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  public provinceList:string[] = [
    "Région de Bruxelles-Capitale",
    "Province du Brabant-flamand",
    "Province d'Anvers",
    "Province de Limbourg",
    "Province de Liège",
    "Province de Luxembourg",
    "Province du Brabant wallon",
    "Province de Namur",
    "Province de Hainaut",
    "Province de Flandre-Occidentale",
    "Province de Flandre-Orientale"
  ];
  constructor(private mService:MagasinService) { }

  getProvincebyPC(postalCode:number){
    if(postalCode >= 1000 && postalCode <= 1299){
      return this.provinceList[0];
    } else if(postalCode >= 1500 && postalCode <= 1999 || postalCode >= 3000 && postalCode <= 3499){
      return this.provinceList[1];
    }else if(postalCode >= 2000 && postalCode <=2999){
      return this.provinceList[2];
    }else if(postalCode >= 3500 && postalCode <= 3999){
      return this.provinceList[3];
    }else if(postalCode >= 4000 && postalCode <= 4999 ){
      return this.provinceList[4];
    }else if(postalCode >= 6600 && postalCode <= 6999){
      return this.provinceList[5];
    }else if(postalCode >= 1300 && postalCode <= 1499){
      return this.provinceList[6];
    }else if(postalCode >= 5000 && postalCode <= 5699){
      return this.provinceList[7];
    }else if(postalCode >= 6000 && postalCode <= 6599 ||postalCode >= 7000 && postalCode <= 7399 || postalCode >= 7500 && postalCode <= 7999){
      return this.provinceList[8];
    }else if(postalCode >= 8000 && postalCode <= 8999){
      return this.provinceList[9];
    }else if(postalCode >= 9000 && postalCode <= 9999){
      return this.provinceList[10];
    }
  }

   
}
