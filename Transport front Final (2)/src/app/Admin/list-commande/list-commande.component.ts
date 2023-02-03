import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Commande} from "../../mode/Commande";;
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../services/token.service";
import {CommandeService} from "../../services/commande.service";


@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.scss']
})
export class ListCommandeComponent implements AfterViewInit {

  displayedColumns: string[] = ['nom','tel','depart','arrive','carType','numberPersons','dateDepart','price','distance','stat','action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  commandes: Commande[];
  images:string[];
  base64Data: Int8Array;
  result: any;
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
    this.commandeService.getAllCommandes().subscribe(data=> {
        this.dataSource.data=data;

      })


  }
  delete(id) {
    window.confirm('vous voulez supprimer cette commande ?')
    this.commandeService.delete(id).subscribe(
      data=>{this.toast.success('commande a ete supprimer')
        this.ngAfterViewInit()}
    )

  }

}
