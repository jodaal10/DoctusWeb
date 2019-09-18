import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataapiService } from 'src/app/services/dataapi.service';
import { actividad } from 'src/app/Interfaces/actividad';
import { tiempo } from 'src/app/Interfaces/tiempo';
import { usuario } from 'src/app/Interfaces/usuario';
import { isNullOrUndefined} from 'util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  timeForm: FormGroup;
  usuario: usuario;
  actividades: actividad[];
  actividad: actividad = new actividad();
  tiempos: tiempo[];
  tiempo: tiempo = new tiempo();
  submitted = false; 
  token: string;

  constructor(private _AuthService: AuthService, private _DataApi: DataapiService,private formBuilder: FormBuilder) { }

  consultaractividades (){
    this.usuario = this._AuthService.getCurrentUser();
    this.token = this._AuthService.getToken() ;
    //Consultar solo las actividesdes del usuario logueado
    this._DataApi.GetActividades(this.usuario.idUsuario,this.token )
    .subscribe(data =>{
      if (data != null){
        this.actividades = data;
      }
    },
    error => {
      console.log(error);
      alert('Error inesperado, comuniquese con el administrador');
    }
    );
  }

  registraractividad():void{
    this.actividad.idUsuario = this.usuario.idUsuario;
    this.token = this._AuthService.getToken() ;
    if(isNullOrUndefined(this.actividad.descripcion)){alert('El campo descripción es obligatorio.'); return;}
    this._DataApi.CrearActividad(this.actividad,this.token)
      .subscribe(data =>{
        if (data != null){
          if(data){
            this.consultaractividades();
            alert('Registro almacenado con exito');
            this.actividad = new actividad();
          }
        }
      },
        error => {
        console.log(error);
        alert('Error inesperado, comuniquese con el administrador');
      }
      );
  }

  AddHoras(idActividad): void{
    this.timeForm.controls.IdActividad.setValue(idActividad);
    this.Consultartiempos(idActividad);
  }

  Consultartiempos(idActividad){
    this.token = this._AuthService.getToken() ;
    //Consultar los tiempos de la actividad seleccionada
    this._DataApi.GetTiempo(idActividad,this.token)
    .subscribe(data =>{
      if (data != null){
        this.tiempos = data;
      }
    },
    error => {
      console.log(error);
      alert('Error inesperado, comuniquese con el administrador');
    }
    );
  }

  CrearTiempo(): void{
    this.submitted = true;
    //validar form
    if (this.timeForm.invalid) {return;}
    //validar maximo 8 horas
    if(this.validartotaltiempo()){
      this.tiempo.idActividad = this.timeForm.controls.IdActividad.value;
      this.tiempo.fecha = this.timeForm.controls.Fecha.value;
      this.tiempo.tiempo = this.timeForm.controls.Tiempo.value;
      this.token = this._AuthService.getToken() ;
      this._DataApi.CrearTiempo(this.tiempo,this.token)
        .subscribe(data =>{
          if (data != null){
            if(data){
              this.Consultartiempos(this.tiempo.idActividad);
              alert('Registro almacenado con exito');
            }
          }
        },
          error => {
          console.log(error);
          alert('Error inesperado, comuniquese con el administrador');
        }
        );

    }else{
      alert("los tiempos de una actividad solo pueden sumar máximo 8 horas");
    }
  }

  validartotaltiempo(): boolean{
    let suma: number = 0;
    this.tiempos.forEach(element => {
      suma = suma + element.tiempo;
    });
    if((suma + this.timeForm.controls.Tiempo.value) <= 8){
      return true;
    }else{
      return false;
    }
  }

  EliminarTiempo(IdTiempo): void{
    if(confirm("Esta seguro de eliminar el registro?")) {
      this.token = this._AuthService.getToken() ;
      this._DataApi.DeleteTiempo(IdTiempo,this.token)
        .subscribe(data =>{
          if (data != null){
            this.Consultartiempos(this.timeForm.controls.IdActividad.value);
            alert("Registro eliminado correctamente");
          }
        },
        error => {
          console.log(error);
          alert('Error inesperado, comuniquese con el administrador');
        }
        );
    }
  }

  EliminarActividad(IdActividad): void{
    if(confirm("Esta seguro de eliminar el registro?")) {
      this.token = this._AuthService.getToken() ;
      this._DataApi.DeleteActividad(IdActividad,this.token)
        .subscribe(data =>{
          if (data != null){
            this.consultaractividades ()
            alert("Registro eliminado correctamente");
          }
        },
        error => {
          console.log(error);
          alert('Error inesperado, comuniquese con el administrador');
        }
        );
    }

  }
  regresar(): void{
    this.submitted = false;
    this.tiempo = new tiempo();
    this.timeForm.controls.Fecha.setValue("");
    this.timeForm.controls.Tiempo.setValue("");
  }

  ngOnInit() {
    //Consultar Actividades del usuario al cargar la pagina.
    this.consultaractividades();

    this.timeForm = this.formBuilder.group({
      IdActividad: ['{disabled: true}', Validators.required],
      Fecha: ['', Validators.required],
      Tiempo: ['', Validators.required]
    });
  }

  get f() { return this.timeForm.controls; }

}
