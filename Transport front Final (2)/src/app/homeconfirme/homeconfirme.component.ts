import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Commande } from '../mode/Commande';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-homeconfirme',
  templateUrl: './homeconfirme.component.html',
  styleUrls: ['./homeconfirme.component.scss']
})
export class HomeconfirmeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:Commande,
              private commandeService:CommandeService,
              private toast:ToastrService,private router: Router ) { }

  ngOnInit(): void {
  }


  verifer(){
    this.valide();
    this.gotoList();
    
  }
  valide() {


    this.commandeService.addCommande(this.data).subscribe(
      res => {
        this.toast.success('Données ajoutées avec succés !!', 'add', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        

      },
      
      error => this.toast.error('Données non ajoutées !!', 'add', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      
      })
      

    )
  }
  gotoList() {
    this.router.navigate(['login']);
  
  }
 close(){
   
 }
}
