import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable} from "rxjs";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
apiUrl=environment.apiURL
  constructor(private http: HttpClient) { }

  public login(auth: {email: string, password: string}):Observable <any> {
    return this.http.post<any>(this.apiUrl+'users/login', auth);
  }


}

