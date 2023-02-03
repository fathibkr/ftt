import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Commande, Stat} from "../../mode/Commande";
import {CommandeService} from "../../services/commande.service";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-list-commande-client',
  templateUrl: './list-commande-client.component.html',
  styleUrls: ['./list-commande-client.component.scss']
})
export class ListCommandeClientComponent implements AfterViewInit {


  displayedColumns: string[] = ['depart','arrive','carType','numberPersons','dateDepart','price','distance','stat','action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  commandes: Commande[];
  images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
  constructor( private commandeService:CommandeService ,
               private toast:ToastrService,
               private token:TokenService) {
    this.dataSource = new MatTableDataSource(this.commandes);
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
    this.commandeService.getCommandeByClient(Number(localStorage.getItem('id'))).subscribe(data=> {
        this.dataSource.data=data;

      }
    )
  }

  Annuler(element) {
    element.stat=Stat.ANNULER
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
  complete(element:Commande) {
    element.stat=Stat.COMPLETE;
    this.commandeService.UpdateCommande(element).subscribe(
      res => {
        this.toast.success('Données ajoutées avec succés !!', 'add', {
          timeOut: 3000,
          positionClass: 'toast-bottom-right'
        });
        this.ngAfterViewInit();
      },
      error => this.toast.error('Données non ajoutées !!', 'add', {
        timeOut: 3000,
        positionClass: 'toast-bottom-right'
      })
    )


  }
}
