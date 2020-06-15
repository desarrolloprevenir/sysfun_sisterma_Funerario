import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';
import {Location} from '@angular/common';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthorisationGuard implements CanActivate {


  constructor(private usuarioService: UsuarioService,
              private location: Location) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
   ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var data = next.data;
    var menu: any = this.usuarioService.cargarInfo().usuario.menu;
    // console.log('data', data);
    // console.log('menu', menu);

    switch (data.p) {
      case 'crear' :
        // console.log('desntro del switch', menu[data.m].subMenu[data.sm].permisos.crear);
        if (menu[data.m].subMenu[data.sm].permisos.crear) {
          return true;
        }

        Swal.fire('Falta Autorización', 'El usuario no tiene permiso para entrar en esta pagina', 'warning');
        this.location.back();
        return false;

        case 'editar' :

        if (menu[data.m].subMenu[data.sm].permisos.editar) {
          return true;
        }
        Swal.fire('Falta Autorización', 'El usuario no tiene permiso para entrar en esta pagina', 'warning');
        this.location.back();
        return false;
    }



    // return true;
  }
}
