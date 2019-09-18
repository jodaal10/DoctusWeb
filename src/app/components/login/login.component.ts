import { Component, OnInit } from '@angular/core';
import { usuario } from 'src/app/Interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false; 
  Respuesta = true;

  constructor(private _AuthService: AuthService, private router: Router,private formBuilder: FormBuilder,public nav: NavbarService) { }

  private user: usuario = new usuario();

  Login(){
    this.submitted = true;
     // stop here if form is invalid
     if (this.loginForm.invalid) {return;}

     this.user.usuario = this.loginForm.controls.Usuario.value;
     this.user.clave = this.loginForm.controls.password.value;

    return this._AuthService.AutenticarUsuario(this.user)
      .subscribe(data =>{
        if (data == null){
          this.Respuesta = false;
          this.nav.hide();
        }else{
          this._AuthService.setUser(data);
          this.GenerarToken();
          this.router.navigate(['/home']);
          this.Respuesta = true;
          this.nav.show();
        }
      },
      error => {
        console.log(error)
        this.Respuesta = false;
      }
      );
  }

  GenerarToken(){
    this._AuthService.GenerarToken(this.user)
    .subscribe(data =>{
      if (data == null){
        this.router.navigate(['/login']);
      }else{
        let token = data.token_type +" "+data.access_token;
        this._AuthService.setToken(token);
      }
    },
    error => {
      console.log(error)
      this.Respuesta = false;
    }
    );
  }

  ngOnInit() { 
    this.loginForm = this.formBuilder.group({
      Usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

}
