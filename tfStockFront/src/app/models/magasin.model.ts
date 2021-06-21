import { Ville } from "./ville.model";

export interface Magasin{
    id:number,
    name:string,
    street:string,
    number:number,
    city:Ville,
    locationLink:string
}