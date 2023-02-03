
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  title = 'PFEff';

  lat = 33.349122 ;
  lng = 10.494395;
  
  dataset: Details = {
    nom:'',
    email:'',
    tel:null,
    msg:''
    
  };
  constructor(private https: HttpClient) { }
  onSubmit(){
    this.https.post('http://localhost:8085/user/contact', this.dataset).subscribe(
        res => {
         
          console.log(res);
          alert('Email Sent successfully');
          this.dataset.tel = null;
          this.dataset.nom = '';
          this.dataset.msg = '';
          this.dataset.email = '';
        });
  }
  ngOnInit() {
  }
}
interface Details{
  nom:string;
  email:string;
  tel:number;
  msg:string;
 
}
 
  

