import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  email = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  password = new  FormControl('', [
    Validators.required,
  ]);

  showAlert = false;
  alertMsg ='Signing in.';
  alertColor ='blue';

  loginForm = new FormGroup({
    email: this.email,
    password: this.password
  });

  login(){
    this.showAlert = true;
    this.alertMsg ='Signing in.';
    this.alertColor='blue';
  }

}
