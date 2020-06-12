import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

// modelos
import { Usuario } from '../../models/usuario.model';

const apiUrl = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string;
  public usuario: Usuario;

  constructor(public http: HttpClient,
              public router: Router) {
               }

// ======================================
// Metodo para registrar un provedor
// ======================================
  registrarProvedor(provedor: any) {
    return this.http.post( apiUrl + '/registro', provedor )
                    .map( (resp: any) => {
                      console.log(resp);
                      Swal.fire('Usuario con el correo', provedor.usuario.correo + ' creado exitosamente', 'success' );
                      this.router.navigate(['/login']);
                      // let usuario = { usuario: provedor.usuario.usuario, contrasena: provedor.usuario.contrasena };
                      // this.login(usuario).subscribe();
                    }).catch( err => {
                      Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
                      return Observable.throw(err);
                    });
  }

// ======================================
// Login
// ======================================
login(usuario: any) {
  return this.http.post( apiUrl + '/login', usuario )
                  .map( (resp: any) => {
                    // console.log(resp);
                    this.guardarEnStorage(resp);
                    this.router.navigate(['/home']);
                  }).catch( err => {
                    Swal.fire('Error', err.error.mensaje, 'error');
                    return Observable.throw(err);
                  });
}

// ======================================
// Cerrar Sesion
// ======================================
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  this.token = '';
  this.usuario = null;
  this.router.navigate(['/login']);
}

// ======================================
// Guardar info  local storage
// ======================================
guardarEnStorage(usuario: any) {
  // console.log(usuario);
  this.token = usuario.token;
  this.usuario = usuario.usuario;
  localStorage.setItem('token', this.token);
  localStorage.setItem('user', JSON.stringify(this.usuario));
  // this.cargarInfoToken();
}


// ======================================
// Cargar info token
// ======================================

cargarInfo() {

  this.token = localStorage.getItem('token');
  this.usuario = JSON.parse( localStorage.getItem('user') );

  let info = {usuario: this.usuario, token: this.token};
  return info;
}


// ======================================
// Get usuarios por idEmpresa
// ======================================

getUsuarios(idEmpresa) {

  // console.log(idEmpresa, 'token' + this.token);
  return this.http.get(apiUrl + '/usuario/empresa/' + idEmpresa + '?token=' + this.token)
                  .map( (res: any) => {
                        console.log(res);
                        return res.usuarios;
                  }).catch( err => {
                      Swal.fire('Error', err.error.mensaje, 'error');
                      if (err.status === 401) {
                        this.logout();
                      }
                      return Observable.throw(err);
                  });
}


}
