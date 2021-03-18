import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {InscriptionComponent} from './inscription/inscription.component';
import {AccueilUtilisateurComponent} from './accueil-utilisateur/accueil-utilisateur.component';
import {AccueilSuperAdminComponent} from './accueil-super-admin/accueil-super-admin.component';

const routes: Routes = [

  {path: 'accueilsuper', component: AccueilSuperAdminComponent},
  {path: 'accueilutilisateur/:id', component: AccueilUtilisateurComponent},
  {path: 'inscription', component: InscriptionComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'accueilsuper', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
