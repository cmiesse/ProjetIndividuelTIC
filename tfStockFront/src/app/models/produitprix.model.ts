import { Magasin } from "./magasin.model";
import { Produit } from "./produit.model";

export interface ProduitPrix{
    id:number,
    product:Produit,
    shop:Magasin,
    price:number
}