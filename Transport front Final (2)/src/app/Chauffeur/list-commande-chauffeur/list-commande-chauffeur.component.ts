import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Commande} from "../../mode/Commande";
import {CommandeService} from "../../services/commande.service";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-list-commande-chauffeur',
  templateUrl: './list-commande-chauffeur.component.html',
  styleUrls: ['./list-commande-chauffeur.component.scss']
})
export class ListCommandeChauffeurComponent implements AfterViewInit {
  displayedColumns: string[] = [ 'nom','tel','depart','arrive','carType','numberPersons','dateDepart','price','distance','stat'];

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
    this.commandeService.getCommandeByChauffeur(Number(localStorage.getItem('id'))).subscribe(data=> {
        this.dataSource.data=data;

      }
    )
  }

}
