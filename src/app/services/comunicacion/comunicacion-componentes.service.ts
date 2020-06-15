import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosComponent } from '../../aplicacion/modulos/administracion/usuarios/usuarios.component';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionComponentesService {
  public info: any;

  constructor(private router: Router) { }

  setInfo(ruta: string, info: any) {

    this.info = info;
    this.router.navigate([ruta]);
    console.log(ruta);
  }

  getInfo() {
    
  }


}
