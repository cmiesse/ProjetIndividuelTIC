import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix'
})
export class PrixPipe implements PipeTransform {

  transform(prix:number|null): string {
    if(prix==null) return "N.C.";
    return prix+" €";
  }

}
