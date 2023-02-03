import { Component, OnInit } from '@angular/core';
import {Client} from "../../mode/Client";
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";
import {LoaderService} from "../../services/loader.service";
import {AccountService} from "../../services/account.service";
import {MatDialog} from "@angular/material/dialog";
import {Chauffer} from "../../mode/Chauffer";

@Component({
  selector: 'app-dash-chauffeur',
  templateUrl: './dash-chauffeur.component.html',
  styleUrls: ['./dash-chauffeur.component.scss']
})
export class DashChauffeurComponent implements OnInit {

  user=new Chauffer();

  selectedFile: File;
  retrievedImage: any;
  base64Data: any;
  constructor(private tokenService: TokenService,
              private router: Router,
              public LoadService: LoaderService,
              private accountService: AccountService,
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.getUserById();

  }


  logout() {
    this.tokenService.remove();
    this.router.navigateByUrl("/login");

  }

  getUserById() {
    this.accountService.getUserByEmail(this.tokenService.getId()).subscribe(data => {
      this.user = data;
      localStorage.setItem('carType', this.user.carType.toString())
      this.getImage();

    }
  )
  }

  getImage() {
    this.base64Data = this.user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }
  openDialog() {
    this.dialog.open(null,{
      height: '50%',
      width: '40%'
    });
  }
  openDialogPassword() {
    this.dialog.open(null,{
      height: '40%',
      width: '60%'
    });
  }

}
