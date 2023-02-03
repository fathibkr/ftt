import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Commande, Stat} from "../../mode/Commande";
import {CommandeService} from "../../services/commande.service";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../services/token.service";
import {AccountService} from "../../services/account.service";
import {Chauffer} from "../../mode/Chauffer";

@Component({
  selector: 'app-list-commande-attente',
  templateUrl: './list-commande-attente.component.html',
  styleUrls: ['./list-commande-attente.component.scss']
})
export class ListCommandeAttenteComponent implements AfterViewInit {

  displayedColumns: string[] = ['nom','tel','depart','arrive','carType','numberPersons','dateDepart','price','distance','stat'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  commandes: Commande[];
  images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
  private chauffeur: Chauffer;
  constructor( private commandeService:CommandeService ,
               private toast:ToastrService,
               private accountService:AccountService) {
    this.dataSource = new MatTableDataSource(this.commandes);
    this.accountService.getUserByEmail(localStorage.getItem('id')).subscribe(
      data=>this.chauffeur=data
    )
  }

  ngAfterViewInit() {
    this.getAllUser();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getAllUser(){
    console.log('ffsfdfdsfsdsdfsdfsd');
    console.log()
    console.log(localStorage.getItem('carType'));
      this.commandeService.getCommandeByStatAndCar(localStorage.getItem('carType')).subscribe(data=> {
        this.dataSource.data=data;

      }
    )
  }

  accepter(element:Commande) {
    element.stat=Stat.EN_COURS;
    element.chauffeur=this.chauffeur
    this.commandeService.UpdateCommande(element).subscribe(
      res => {
        this.toast.success('Données ajoutées avec succés !!', 'add', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
this.ngAfterViewInit();
      },
      error => this.toast.error('Données non ajoutées  !!', 'add', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      })
    )


  }
}
