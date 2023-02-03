import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import {ToastrModule} from "ngx-toastr";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JwtInterceptorService} from "./services/jwt-interceptor.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { DashbordComponent } from './Admin/dashbord/dashbord.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { ListClientComponent } from './Admin/list-client/list-client.component';
import { ListCommandeComponent } from './Admin/list-commande/list-commande.component';
import { ListChaffeurComponent } from './Admin/list-chaffeur/list-chaffeur.component';
import {MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatChipsModule} from "@angular/material/chips";
import {MatRadioModule} from "@angular/material/radio";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import { DashClientComponent } from './Client/dash-client/dash-client.component';
import { CommandeComponent } from './Client/commande/commande.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import { ListCommandeClientComponent } from './Client/list-commande-client/list-commande-client.component';
import { ListCommandeChauffeurComponent } from './Chauffeur/list-commande-chauffeur/list-commande-chauffeur.component';
import { DashChauffeurComponent } from './Chauffeur/dash-chauffeur/dash-chauffeur.component';
import { ListCommandeAttenteComponent } from './Chauffeur/list-commande-attente/list-commande-attente.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import {AgmCoreModule} from "@agm/core";
import {MatGoogleMapsAutocompleteModule} from "@angular-material-extensions/google-maps-autocomplete";
import { ConfirmComponent } from './Client/confirm/confirm.component';
import { LayoutComponent } from './layout/layout.component';
import { ContactComponent } from './contact/contact.component';
import { ServiceComponent } from './service/service.component';
import { HomeComponent } from './home/home.component';
import { HomeconfirmeComponent } from './homeconfirme/homeconfirme.component';
import { WorkComponent } from './work/work.component';


@NgModule({
  declarations: [						
    AppComponent,
    LoginComponent,
    DashbordComponent,
    ListClientComponent,
    ListCommandeComponent,
    ListChaffeurComponent,
    DashClientComponent,
    CommandeComponent,
    ListCommandeClientComponent,
    ListCommandeChauffeurComponent,
    DashChauffeurComponent,
    ListCommandeAttenteComponent,
    UpdateProfileComponent,
    ConfirmComponent,
      LayoutComponent,
      ContactComponent,
      ServiceComponent,
      HomeComponent,
      HomeconfirmeComponent,
      WorkComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatProgressBarModule,
    MatTableModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatChipsModule,
    MatRadioModule,
    MatSelectModule,
    MatDialogModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA5T5CF_B5XsZ_hdpzs4wgK_aTiq4K_A6M',
      libraries: ['places']
    }),
    MatGoogleMapsAutocompleteModule,
  ],
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
