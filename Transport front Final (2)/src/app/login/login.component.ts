import {Component} from '@angular/core';
import {TokenService} from "../services/token.service";
import {AuthentificationService} from "../services/authentification.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../services/account.service";
import {FileDB} from "../mode/FileDB";
import {Chauffer} from "../mode/Chauffer";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = new FormControl('', [Validators.required, Validators.email]);
  user: Chauffer = new Chauffer();
  hide = true;
  Admin = true;
  confirmPassword = new FormControl(null, [Validators.required, Validators.minLength(8)])
  show = true;
  message: File;
  photo: File;
  password = new FormControl(null, [Validators.required, Validators.minLength(8)])
  base64Data: Int8Array;
  retrievedImage: string = 'assets/avatar.jpg';
  region: string;

  loginForm = new FormGroup({
    email: this.email,
    password: this.password

  });
  role="client";

  constructor(private authService: AuthentificationService,
              private accountService: AccountService,
              private tokenService: TokenService,
              private toast: ToastrService,
              private router: Router) {
  }


  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.email.hasError('email') ? 'Email non valide' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.password.hasError('password') ? 'Mot de passe non valide' : '';
  }

  ngOnInit(): void {
    this.user.image = new FileDB();


  }


  getErrorConfirmPasswordMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    return this.confirmPassword.hasError('password') ? 'Mot de passe non valide' : '';
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }

    return this.email.hasError('email') ? 'Email non valide' : '';
  }

  onSelectFile(event: any) {
    if (event.target.files.length > 0) {
      this.photo = event.target.files[0];
      this.message = this.photo;
      const reader = new FileReader();
      reader.onload = () => {
        this.retrievedImage = reader.result as string;
      }
      reader.readAsDataURL(this.photo)

    }
  }

  addUser() {
    this.user.password = this.password.value;
    if (this.role=="chauffeur") {
      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      formData.append('image', this.photo);
      formData.append('user', JSON.stringify(this.user));
      this.accountService.addChauffeur(formData)
        .subscribe({
          next: res => {
            this.toast.success('Données ajoutées avec succés !!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });

          },
          error: error => this.toast.error('Données non ajoutées !!', 'add', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          })
        });
    } else {
      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      formData.append('image', this.photo);
      formData.append('user', JSON.stringify(this.user));
      this.accountService.addClient(formData)
        .subscribe({
          next: res => {
            this.toast.success('Données ajoutées avec succés!!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
          },
          error: error => this.toast.error('Données non ajoutées !!', 'add', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          })
        });
    }

  }


  signIn() {
    this.authService.login(this.loginForm.value).subscribe({
      next: res => this.handleResponse(res),
      error: err => this.toast.error(
        `error`,
        'Quelque chose ne va pas ',
        {
          timeOut: 3000,
          positionClass: 'toast-bottom-left'
        }
      )
    });
  }

  handleResponse(data:any) {
    this.tokenService.handle(data);

    this.accountService.changeAuthStatus(true);
    this.toast.success(
      `Bienvenue `+this.tokenService.getUserName(),
      'Tu es connecté !',
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-right',

      },

    );
    if(this.tokenService.getUserRole()=='client') {
      this.router.navigateByUrl('/client/listCommande')
    } else  if(this.tokenService.getUserRole()=='chauffeur') {
      this.router.navigateByUrl('/chauffeur/listCommandes')
    } else    this.router.navigateByUrl('/dashboard')

  }



}
