import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import { isNullOrUndefined} from 'util';
import { environment } from 'src/environments/environment';
import { Endpoint } from '../config/api';
import { usuario } from '../Interfaces/usuario';
import { token } from '../Interfaces/token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  AutenticarUsuario(_usuario: usuario){
    const Options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
    
    return this
      .http.post<usuario>(`${environment.apiURL}${Endpoint.Autenticar}`, _usuario,Options)
      .pipe(map(data => data));
  }

  GenerarToken(_usuario: usuario){
    const Options = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'No-Auth': 'True'
      })
    };
        
    const body = new URLSearchParams();
    body.set('username', _usuario.usuario);
    body.set('password', _usuario.clave);
    body.set('grant_type', 'password');

    return this
      .http.post<token>(`${environment.apiURL}${Endpoint.Token}`,body.toString())
      .pipe(map(data => data));
  }

  setToken(token):void{
    localStorage.setItem("accessToken",token);
  }

  getToken(){
    return localStorage.getItem("accessToken");
  }

  setUser(user):void{
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  getCurrentUser(){
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)){
        let user = JSON.parse(user_string);
        return user;
    }else{
      return null;
    }
  }

  logoutUser(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("currentUser");
  }

}
