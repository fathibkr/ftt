import {Chauffer} from "./Chauffer";
import {Client} from "./Client";

export class Commande {
  id: number;
  depart: string;
  arrive: string;

  carType: CarType;
  numberPersons: number;
  dateDepart: Date;
  price: number;
  distance: number;
  stat: Stat;

  chauffeur: Chauffer;

  client: Client;
}

export enum Stat {
  EN_COURS,EN_ATTENTE,COMPLETE,ANNULER
}

export enum CarType {
  VEHICULE,CAMION,CAMION_POIDS_LOURDS

}
