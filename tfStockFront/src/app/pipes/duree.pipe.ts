import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duree'
})
export class DureePipe implements PipeTransform {

  transform(dateToCalculate:Date): string {
    const  maintenant = new Date();
    const dateConvert = new Date(dateToCalculate);
    var diff = Math.floor((maintenant.getTime()-dateConvert.getTime())/1000);
    if(diff < 60) return diff+"s";
    else if(diff<3600) return Math.floor(diff/60)+" min";
    else if(diff < 86400) return Math.floor(diff/3600)+"h";
    else if(diff < (2*86400)) return "hier";
    else return Math.floor(diff/86400)+" jours";
  }

}
