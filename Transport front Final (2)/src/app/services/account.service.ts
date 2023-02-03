import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {environment} from "../../environments/environment";
import {TokenService} from "./token.service";
import {HttpClient} from "@angular/common/http";
import {Admin} from "../mode/Admin";
import {Chauffer} from "../mode/Chauffer";
import {Client} from "../mode/Client";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  apiUrl=environment.apiURL
  private url = this.apiUrl+'user/';

  constructor(private Token: TokenService, private http: HttpClient) {
  }

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(!value);
  }

  getUserByEmail(id: string): Observable<any> {
    return this.http.get<any>(this.url + id)
  }

  getImages(imageName): Observable<any> {
    return this.http.get<any>(this.url + imageName);
  }

  updateUser(formData: FormData): Observable<Admin> {
    return this.http.put<Admin>(this.url, formData)
  }

  getAllChauffer(): Observable<Chauffer[]> {
    return this.http.get<Chauffer[]>(this.url+'chauffeur/all')
  }
  getTotalChauffeur(): Observable<bigint> {
    return this.http.get<bigint>(this.url+'chauffeur/total')
  }
  getAllClient(): Observable<Client[]> {
    return this.http.get<Client[]>(this.url+'client/all')
  }
  getTotalClient(): Observable<bigint> {
    return this.http.get<bigint>(this.url+'client/total')
  }
  addClient(formData: FormData): Observable<Client> {
    return this.http.post<Client>(this.url+'client', formData);
  }
  addChauffeur(formData: FormData): Observable<Chauffer> {
    return this.http.post<Chauffer>(this.url+'chauffeur', formData);
  }
  addUserWithoutImage(user: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.url + 'add', user);
  }

  updateUserWithoutImage(user: Admin): Observable<Admin> {
    return this.http.put<Admin>(this.url + 'update', user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + id);
  }



  resetPassword(id: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + id, password)
  }


}
