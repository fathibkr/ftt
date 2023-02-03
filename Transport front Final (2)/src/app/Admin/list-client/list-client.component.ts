import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Commande} from "../../mode/Commande";
import {CommandeService} from "../../services/commande.service";
import {ToastrService} from "ngx-toastr";
import {TokenService} from "../../services/token.service";
import {Chauffer} from "../../mode/Chauffer";
import {AccountService} from "../../services/account.service";
import {Client} from "../../mode/Client";

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.scss']
})
export class ListClientComponent implements AfterViewInit {

  displayedColumns: string[] = ['id','firstName','lastName','email','birthDay','mobile','action'];

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  users: Client[];
  images:string[];
  base64Data: Int8Array;
  retrievedImage: string;
  constructor( private accountService:AccountService ,
               private toast:ToastrService,
               private token:TokenService) {
    this.dataSource = new MatTableDataSource(this.users);
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
    this.accountService.getAllClient().subscribe(data=> {
        this.dataSource.data=data;

      }
    )
  }

  getImage(user:Chauffer) {
    this.base64Data = user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;

    return this.retrievedImage;
  }


  delete(id) {
    window.confirm('vous voulez supprimer ce client ?')
    this.accountService.deleteUser(id).subscribe(
      data=>{this.toast.success('client a ete supprimer')
      this.ngAfterViewInit()}
    )

  }
}
