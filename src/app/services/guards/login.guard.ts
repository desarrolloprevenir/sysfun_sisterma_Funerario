import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(public usuarioService: UsuarioService,
              public router: Router) {
  }

  canActivate() {
  //  console.log(this.usuarioService.cargarInfo().token);
   if (!this.usuarioService.cargarInfo().token) {
      // console.log('No esta logueado');
      this.router.navigate(['/login']);
      return false;
   }
  //  console.log('esta logueado');
   return true;
 }
}
