import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { AnnonceComponent } from './annonce/annonce.component';
import { MagasinComponent } from './magasin/magasin.component';
import { ProduitComponent } from './produit/produit.component';
import { TypeComponent } from './type/type.component';
import { VilleComponent } from './ville/ville.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { ProfilComponent } from './profil/profil.component';
import { NewAnnonceComponent } from './annonce/new-annonce/new-annonce.component';
import { ProvincePipe } from './pipes/province.pipe';
import { DureePipe } from './pipes/duree.pipe';
import { ContactComponent } from './contact/contact.component';
import { PrixComponent } from './prix/prix.component';
import { PrixPipe } from './pipes/prix.pipe';
import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { ChangePasswordComponent } from './profil/change-password/change-password.component';
import { NewTypeComponent } from './type/new-type/new-type.component';
import { NewPrixComponent } from './prix/new-prix/new-prix.component';
import { NewProduitComponent } from './produit/new-produit/new-produit.component';
import { NewVilleComponent } from './ville/new-ville/new-ville.component';
import { NewMagasinComponent } from './magasin/new-magasin/new-magasin.component';
import { NewMessageComponent } from './contact/new-message/new-message.component';
import { TypeDetailsComponent } from './type/type-details/type-details.component';
import { ProduitDetailsComponent } from './produit/produit-details/produit-details.component';
import { VilleDetailsComponent } from './ville/ville-details/ville-details.component';
import { MagasinDetailsComponent } from './magasin/magasin-details/magasin-details.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    NotFoundComponent,
    HeaderComponent,
    SignUpComponent,
    SignInComponent,
    AnnonceComponent,
    MagasinComponent,
    ProduitComponent,
    TypeComponent,
    VilleComponent,
    NavComponent,
    ProfilComponent,
    NewAnnonceComponent,
    ProvincePipe,
    DureePipe,
    ContactComponent,
    PrixComponent,
    PrixPipe,
    UtilisateurComponent,
    ChangePasswordComponent,
    NewTypeComponent,
    NewPrixComponent,
    NewProduitComponent,
    NewVilleComponent,
    NewMagasinComponent,
    NewMessageComponent,
    TypeDetailsComponent,
    ProduitDetailsComponent,
    VilleDetailsComponent,
    MagasinDetailsComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
