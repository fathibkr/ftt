import {Component, OnInit} from '@angular/core';
import {CarType, Commande} from "../../mode/Commande";
import {CommandeService} from "../../services/commande.service";
import {ToastrService} from "ngx-toastr";
import {Client} from "../../mode/Client";
import {AccountService} from "../../services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfigCommand} from "@angular/cli/commands/config-impl";
import {ConfirmComponent} from "../confirm/confirm.component";

@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
client:Client
  type:any
depart: any ={
  latitude: 0,
  longitude: 0
}
  arrive: any ={
    latitude: 0,
    longitude: 0
  }

  constructor( private commandeService:CommandeService,
               private accountService:AccountService,
               private toast:ToastrService,
                private dialog:MatDialog) { }
commande=new Commande();
  time: any;
  ngOnInit(): void {
    this.accountService.getUserByEmail(localStorage.getItem('id')).subscribe(
      data=>this.client=data
    )
  }
  addCommande() {
    this.commande.client=this.client
    this.commande.carType=this.type
    this.calculedePrix();
    this.dialog.open(ConfirmComponent,
      {
        data:this.commande,
      height: '50%',
      width: '40%'
    }
    );

  }

  onAutocompleteSelected($event: google.maps.places.PlaceResult) {
this.commande.depart=$event.formatted_address
  }
  onAutocompleteSelected1($event: google.maps.places.PlaceResult) {
    this.commande.arrive=$event.formatted_address
  }

  onLocationSelected($event: Location) {
   this.depart=$event;
  }
  onLocationSelected2($event: Location) {
  this.arrive=$event
    this.getDistanceFromLatLonInKm(this.depart.latitude,this.depart.longitude,this.arrive.latitude,this.arrive.longitude)
  }
calculedePrix(){

  this.commande.price=0
    if(this.type=="VEHICULE"){
      this.commande.price+= this.commande.distance*2;

    }else  if(this.type=="CAMION"){
      this.commande.price+= this.commande.distance*3;
    }else {
      this.commande.price+= this.commande.distance*4;
    }
  this.commande.price+=20*this.commande.numberPersons;

    console.log(  this.commande.price)
}
getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    let R = 6371; // Radius of the earth in km
  let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  let dLon = this.deg2rad(lon2-lon1);
  let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  let d = R * c; // Distance in km
 this.commande.distance=Math.round(d * 100) / 100;
    return d;

  }

 deg2rad(deg) {
    return deg * (Math.PI/180)
  }
}
