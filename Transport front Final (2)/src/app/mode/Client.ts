import {FileDB} from "./FileDB";
import {Commande} from "./Commande";

export class Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image: FileDB;
  mobile: number;
  birthDay: Date;
  commandes: Commande[];
}
