import { Magasin } from "./magasin.model";
import { Produit } from "./produit.model";
import { User } from "./user.model";

export interface Annonce{
    id:number,
    quantity:string,
    product:Produit,
    user:User,
    shop:Magasin,
    createdAt:Date,
    price:number
}