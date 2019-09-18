import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { usuario } from 'src/app/Interfaces/usuario';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private _AuthService: AuthService, private router: Router,public nav: NavbarService) { }
  
  public app_name = "Doctus";

  private user: usuario = {
    idUsuario: 0,
    usuario:"",
    clave: ""
  };

  onLogout(): void{
    this._AuthService.logoutUser();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.validarmenu();
  }

  validarmenu():void {
    this.user = this._AuthService.getCurrentUser();
    if(this.user != null){
      this.nav.show();
    }else{
      this.nav.hide();
    }
  }

}
