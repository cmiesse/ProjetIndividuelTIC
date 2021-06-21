import { Produit } from "./produit.model";
import { Type } from "./type.model";
import { Ville } from "./ville.model";

export interface User{
    id:number,
    username:string,
    token:string,
    firstName:string,
    lastName:string,
    email:string,
    city:Ville
    roles:string[],
    chosenTypes:Type[],
    chosenProducts:Produit[],
    createdAt:Date;
}