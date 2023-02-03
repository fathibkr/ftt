
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {TokenService} from "../services/token.service";
import {AccountService} from "../services/account.service";
;

@Injectable({
  providedIn: 'root'
})
export class AfterAuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private accountService: AccountService,
    private router: Router
  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.loggedIn()) {
      if(this.tokenService.getUserRole()=='client') {
        this.router.navigateByUrl('/client/listCommande')
      } else  if(this.tokenService.getUserRole()=='chauffeur') {
        this.router.navigateByUrl('/chauffeur/listCommandes')
      } else    this.router.navigateByUrl('/dashboard')


    }

    return true;
  }

}
