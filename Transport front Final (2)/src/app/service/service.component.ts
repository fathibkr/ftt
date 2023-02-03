import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    
  }
  course= [
    {'id':1,'name':'Secteur','description':'Avec U Transport , site de réservation de véhicules utilitaires avec chauffeur dans l"heure ou sur rendez-vous, l"opération devient simple et efficace.','image':'../../assets/home.png'},
    {'id':2,'name':'Disponibilité','description':' Disponible 7J/7 partout, le service est proposé avec ou sans manutention et la prestation est assurée par des chauffeurs professionnels équipés.','image':'../../assets/valide.jpg'},
    {'id':3,'name':'Paiement Sécurisé','description':' Paiement par carte bancaire à la commande de la prestation choisie en toute sécurisé ou par chèque et espèces le jour de la livraison.','image':'../../assets/cadna.png'},
    {'id':4,'name':'rapidité','description':'Toute le chauffeur respecter le temps et ils travaillent sur le confort de client et garentie la rapidité de réponse de demande et la livraison. ','image':'../../assets/rapide.png'},
  ]

}
