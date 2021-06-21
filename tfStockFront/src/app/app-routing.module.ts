import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { NewAnnonceComponent } from './annonce/new-annonce/new-annonce.component';
import { ContactComponent } from './contact/contact.component';
import { AdminGuard } from './guard/admin.guard';
import { LoggedGuard } from './guard/logged.guard';
import { NotLoggedGuard } from './guard/not-logged.guard';
import { MagasinDetailsComponent } from './magasin/magasin-details/magasin-details.component';
import { MagasinComponent } from './magasin/magasin.component';
import { NewMagasinComponent } from './magasin/new-magasin/new-magasin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NewPrixComponent } from './prix/new-prix/new-prix.component';
import { PrixComponent } from './prix/prix.component';
import { NewProduitComponent } from './produit/new-produit/new-produit.component';
import { ProduitDetailsComponent } from './produit/produit-details/produit-details.component';
import { ProduitComponent } from './produit/produit.component';
import { ChangePasswordComponent } from './profil/change-password/change-password.component';
import { ProfilComponent } from './profil/profil.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { NewTypeComponent } from './type/new-type/new-type.component';
import { TypeDetailsComponent } from './type/type-details/type-details.component';
import { TypeComponent } from './type/type.component';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { NewVilleComponent } from './ville/new-ville/new-ville.component';
import { VilleDetailsComponent } from './ville/ville-details/ville-details.component';
import { VilleComponent } from './ville/ville.component';

const routes: Routes = [
  {path:"",component:AccueilComponent, pathMatch:"full"},
  {path:"register", component:SignUpComponent, canActivate:[NotLoggedGuard]},
  {path:"annonces", component:AnnonceComponent, canActivate:[LoggedGuard]},
  {path:"add-annonce", component:NewAnnonceComponent, canActivate:[LoggedGuard]},
  {path:"profil", component:ProfilComponent, canActivate:[LoggedGuard]},
  {path:"produits", component:ProduitComponent, canActivate:[AdminGuard]},
  {path:"produit/:id",component:ProduitDetailsComponent, canActivate:[LoggedGuard]},
  {path:"add-produit", component:NewProduitComponent, canActivate:[AdminGuard]},
  {path:"types", component:TypeComponent, canActivate:[AdminGuard]},
  {path:"type/:id",component:TypeDetailsComponent, canActivate:[LoggedGuard]},
  {path:"add-type", component:NewTypeComponent, canActivate:[AdminGuard]},
  {path:"villes", component:VilleComponent, canActivate:[AdminGuard]},
  {path:"ville/:id",component:VilleDetailsComponent, canActivate:[LoggedGuard]},
  {path:"add-ville", component:NewVilleComponent, canActivate:[AdminGuard]},
  {path:"magasins", component:MagasinComponent, canActivate:[AdminGuard]},
  {path:"magasin/:id",component:MagasinDetailsComponent, canActivate:[LoggedGuard]},
  {path:"add-magasin", component:NewMagasinComponent, canActivate:[AdminGuard]},
  {path:"contact", component:ContactComponent, canActivate:[LoggedGuard]},
  {path:"prix", component:PrixComponent, canActivate:[LoggedGuard]},
  {path:"add-prix", component:NewPrixComponent, canActivate:[AdminGuard]},
  {path:"utilisateurs", component:UtilisateurComponent, canActivate:[AdminGuard]},
  {path:"change_password", component:ChangePasswordComponent, canActivate:[LoggedGuard]},
  {path:"404",component:NotFoundComponent},
  {path:"**", redirectTo:"404"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
