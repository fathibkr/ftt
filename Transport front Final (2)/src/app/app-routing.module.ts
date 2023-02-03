import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {DashbordComponent} from "./Admin/dashbord/dashbord.component";
import {ListCommandeComponent} from "./Admin/list-commande/list-commande.component";
import {ListChaffeurComponent} from "./Admin/list-chaffeur/list-chaffeur.component";
import {ListClientComponent} from "./Admin/list-client/list-client.component";
import {DashClientComponent} from "./Client/dash-client/dash-client.component";
import {CommandeComponent} from "./Client/commande/commande.component";
import {ListCommandeClientComponent} from "./Client/list-commande-client/list-commande-client.component";
import {ListCommandeAttenteComponent} from "./Chauffeur/list-commande-attente/list-commande-attente.component";
import {ListCommandeChauffeurComponent} from "./Chauffeur/list-commande-chauffeur/list-commande-chauffeur.component";
import {DashChauffeurComponent} from "./Chauffeur/dash-chauffeur/dash-chauffeur.component";
import {AfterAuthGuard} from "./guards/after.auth.guard";
import {AuthGuard} from "./guards/auth.guard";
import {RoleGuard} from "./guards/role.guard";
import { LayoutComponent } from './layout/layout.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';

const routes: Routes = [
  {
    path: '', 
    component: LayoutComponent,
    children: [
      {path:"",component:HomeComponent},
      {path:"login",component:LoginComponent},
      {path:"contact",component:ContactComponent},
      {path:"service",component:ServiceComponent},
      {path:"work",component:WorkComponent}
    ]
   
  },
  {
    path:"client",component:DashClientComponent,canActivate: [AuthGuard,RoleGuard],data:{role:'client'},children:[
      { path:"listCommande",component:ListCommandeClientComponent},
      { path:"commande",component:CommandeComponent}
    ]
  },
  {
    path:"chauffeur",component:DashChauffeurComponent,canActivate: [AuthGuard,RoleGuard],data:{role:'chauffeur'},children:[
      { path:"listCommandes",component:ListCommandeChauffeurComponent},
      { path:"listAttente",component:ListCommandeAttenteComponent}
    ]
  },
  {
    path:"dashboard",component:DashbordComponent,canActivate: [AuthGuard,RoleGuard],data:{role:'admin'},children:[
      { path:"listCommande",component:ListCommandeComponent},
      { path:"listChauffeur",component:ListChaffeurComponent},
      { path:"listClient",component:ListClientComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
