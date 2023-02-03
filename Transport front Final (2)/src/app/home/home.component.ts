import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { HomeconfirmeComponent } from '../homeconfirme/homeconfirme.component';
import { Client } from '../mode/Client';
import { Commande } from '../mode/Commande';
import { AccountService } from '../services/account.service';
import { CommandeService } from '../services/commande.service';
import PlaceResult = google.maps.places.PlaceResult;
interface Category {
  value: string;
  viewValue: string;
  image: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'google-places-autocomplete';
  userAddress: string = ''
  userLatitude: string = ''
  userLongitude: string = ''


  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address
    this.userLatitude = address.geometry.location.lat()
    this.userLongitude = address.geometry.location.lng()
  }
  categories: Category[] = [
    {value: '1', viewValue: 'aucun', image: '../assets/perss.png'},
    {value: '2', viewValue: '1 personne', image: '../assets/perss.png'},
    {value: '3', viewValue: '2 personne', image: '../assets/pers.png'}
   
  ];client:Client
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
    this.dialog.open(HomeconfirmeComponent,
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


