import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Chauffer} from "../mode/Chauffer";
import {AuthentificationService} from "../services/authentification.service";
import {AccountService} from "../services/account.service";
import {TokenService} from "../services/token.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {FileDB} from "../mode/FileDB";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Commande} from "../mode/Commande";
import {Admin} from "../mode/Admin";

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);

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
              @Inject(MAT_DIALOG_DATA) public user:Admin ,
              private router: Router) {
  }

  getImage() {
    this.base64Data = this.user.image.data;
    this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
  }
  getErrorEmailMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorPasswordMessage() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    return this.password.hasError('password') ? 'Not password valid' : '';
  }

  ngOnInit(): void {

 this.getImage()


  }


  getErrorConfirmPasswordMessage() {
    if (this.confirmPassword.hasError('required')) {
      return 'You must enter a value';
    }
    return this.confirmPassword.hasError('password') ? 'Not password valid' : '';
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
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

      const formData = new FormData();
      if (this.photo) {
        this.user.image.name = this.photo.name;
      }
      console.log(this.user)
      formData.append('image', this.photo);
      formData.append('user', JSON.stringify(this.user));
      this.accountService.updateUser(formData)
        .subscribe({
          next: res => {
            this.toast.success('Data added successfully !!', 'add', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });

          },
          error: error => this.toast.error('Data not added !!', 'add', {
            timeOut: 3000,
            positionClass: 'toast-bottom-right'
          })
        });


  }







}
