import {FileDB} from "./FileDB";
import {CarType, Commande} from "./Commande";

export class Chauffer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: FileDB;
  mobile: number;
  birthDay: Date;
  carType: CarType;
  numFiscal: string;
  cnn: string;
  series: string;
  commandes: Commande[];
}
