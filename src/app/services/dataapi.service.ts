import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/internal/observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Endpoint } from '../config/api';
import { usuario } from '../Interfaces/usuario';
import { tiempo } from '../Interfaces/tiempo';
import { actividad } from '../Interfaces/actividad';

@Injectable({
  providedIn: 'root'
})
export class DataapiService {
  constructor(private http: HttpClient) { }

  GetActividades(idUsuario: number,token: string){
    const Options = {
      headers: new HttpHeaders({
        'Accept': 'app',
        'Authorization': token
      })
    };

    return this
      .http.get<Array<actividad>>(`${environment.apiURL}${Endpoint.GetActividades}${idUsuario}`,Options)
      .pipe(map(data => data));
  }

  GetTiempo(idActivity: number,token: string){
    const Options = {
      headers: new HttpHeaders({
        'Accept': 'app',
        'Authorization': token
      })
    };
    return this
      .http.get<Array<tiempo>>(`${environment.apiURL}${Endpoint.GetTiempo}${idActivity}`,Options)
      .pipe(map(data => data));
  }

  CrearActividad(_actividad: actividad,token: string){
    const Options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'app',
        'Authorization': token
      })
    };
    
    return this
      .http.post<boolean>(`${environment.apiURL}${Endpoint.CreateAct}`, _actividad,Options)
      .pipe(map(data => data));
  }

  CrearTiempo(_tiempo: tiempo,token: string){
    
    const Options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'app',
        'Authorization': token
      })
    };
    
    return this
      .http.post<boolean>(`${environment.apiURL}${Endpoint.CreateTime}`, _tiempo,Options)
      .pipe(map(data => data));
  }

  DeleteTiempo (idTiempo: number,token: string){
    const Options = {
      headers: new HttpHeaders({
        'Accept': 'app',
        'Authorization': token
      })
    };
    return this
      .http.get<Array<actividad>>(`${environment.apiURL}${Endpoint.DeleteTime}${idTiempo}`,Options)
      .pipe(map(data => data));
  }

  DeleteActividad (idActivity: number,token: string){
    const Options = {
      headers: new HttpHeaders({
        'Accept': 'app',
        'Authorization': token
      })
    };
    return this
      .http.get<Array<actividad>>(`${environment.apiURL}${Endpoint.DeleteAct}${idActivity}`,Options)
      .pipe(map(data => data));
  }

}
