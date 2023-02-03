import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Commande, Stat} from "../mode/Commande";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  apiUrl=environment.apiURL
  constructor(private http: HttpClient) { }

 public getAllCommandes():Observable<Commande[]>{
    return this.http.get<Commande[]>(this.apiUrl + 'commande');
  }
  public getTotal():Observable<bigint>{
    return this.http.get<bigint>(this.apiUrl + 'commande/total');
  }

  public addCommande(commande:Commande):Observable<Commande>{
    return this.http.post<Commande>(this.apiUrl+'commande',commande)
  }
  public UpdateCommande(commande:Commande):Observable<Commande>{
    return this.http.put<Commande>(this.apiUrl+'commande',commande)
  }
  public getCommandeByClient(id:number):Observable<Commande[]>{
    return this.http.get<Commande[]>(this.apiUrl + 'commande/client/'+id);
  }
  public AnnulerCommande(id:number):Observable<Commande>{
    return this.http.delete<Commande>(this.apiUrl + 'commande/'+id);
  }
  public getCommandeByChauffeur(id:number):Observable<Commande[]>{
    return this.http.get<Commande[]>(this.apiUrl + 'commande/chauffeur/'+id);
  }
  public getCommandeByStat():Observable<Commande[]>{
    return this.http.get<Commande[]>(this.apiUrl + 'commande/stat/EN_ATTENTE');
  }
  public getCommandeByStatAndCar(id:string):Observable<Commande[]>{
    return this.http.get<Commande[]>(this.apiUrl + 'commande/stat/EN_ATTENTE/'+id);
  }
  public delete(id:number):Observable<Commande[]>{
    return this.http.delete<Commande[]>(this.apiUrl + 'commande/'+id);
  }
}
