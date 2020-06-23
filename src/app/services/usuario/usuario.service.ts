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
import { SubirArchivosService } from './subir-archivos.service';
import { ComunicacionComponentesService } from '../comunicacion/comunicacion-componentes.service';

const apiUrl = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public token: string;
  public usuario: Usuario;

  constructor(public http: HttpClient,
              public router: Router,
              public subirArchivoService: SubirArchivosService) {
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
                    this.guardarEnStorage(resp.token, resp.usuario);
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
  // localStorage.removeItem('token');
  // localStorage.removeItem('user');

  localStorage.clear();
  this.token = '';
  this.usuario = null;
  this.router.navigate(['/login']);
}

// ======================================
// Guardar info  local storage
// ======================================
guardarEnStorage(token, usuario: any) {
  // console.log(usuario);
  this.token = token;
  this.usuario = usuario;
  localStorage.setItem('token', this.token);
  localStorage.setItem('user', JSON.stringify(this.usuario));
  this.cargarInfo();
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
// Get usuario por idUsuario
// ======================================

getUsuario(idUsuario) {
  return this.http.get(apiUrl + '/usuario/' + idUsuario + '?token=' + this.token )
                  .map((res: any) => {
                    return res.usuario;
                  }).catch( err => {
                    Swal.fire('Error', err.error.mensaje, 'error');
                    if (err.status === 401) {
                      this.logout();
                    }
                    return Observable.throw(err);
                });
}


// ======================================
// Get usuarios por idEmpresa
// ======================================

getUsuarios(idEmpresa) {

  // console.log(idEmpresa, 'token' + this.token);
  return this.http.get(apiUrl + '/usuario/empresa/' + idEmpresa + '?token=' + this.token)
                  .map( (res: any) => {
                        // console.log(res);
                        return res.usuarios;
                  }).catch( err => {
                      Swal.fire('Error', err.error.mensaje, 'error');
                      if (err.status === 401) {
                        this.logout();
                      }
                      return Observable.throw(err);
                  });
}


// ======================================
// Metodo para registrar un usuario
// ======================================

registrarUsuario(usuario: Usuario) {
  return this.http.post(apiUrl + '/usuario', usuario)
                  .map( (res: any) => {
                    Swal.fire('Usuario creado', 'El usuario ' + res.usuario.nombres + ' ' + res.usuario.apellidos 
                              + '. Fue creado exitosamente', 'success');
                    return { ok: true, idUsuario: res.usuario._id };
                  } )
                  .catch( err => {
                    Swal.fire(err.error.mensaje, err.error.errors.message, 'error');
                    if (err.status === 401) {
                      this.logout();
                    }
                    return Observable.throw(err);
                  });
}


// ======================================
// Editar Usuario
// ======================================

editUser(usuario: Usuario) {
  return this.http.put(apiUrl + '/usuario' + '?token=' + this.token, usuario)
             .map( (res: any) => {
              // console.log(res);
              Swal.fire('Usuario editado', 'El usuario ' + res.usuario.nombres + ' ' + res.usuario.apellidos
              + '. Fue editado', 'success');


              if (this.usuario._id === res.usuario._id) {
                this.guardarEnStorage(this.token, res.usuario);
              }


              return { ok: true, idUsuario: res.usuario._id };
             }).catch( err => {
              Swal.fire('Error', err.error.mensaje, 'error');
              if (err.status === 401) {
                this.logout();
              }
              return Observable.throw(err);
          });
}


// ======================================
// Eliminar Usuario
// ======================================

dltUser(idUsuario) {
  return this.http.delete( apiUrl + '/usuario/' + idUsuario + '?token=' + this.token )
                  .map( (res: any) => {
                    // console.log(res);
                    Swal.fire('Eliminado', 'Usuario ' + res.usuario.nombres + ' ha sido eliminado.', 'success');
                    return true;
                  }).catch( err => {
                    Swal.fire('Error', err.error.mensaje, 'error');
                    if (err.status === 401) {
                      this.logout();
                    }
                    return Observable.throw(err);
                });
}

// ======================================
// Put imagen usuario
// ======================================

cambiarImagen(archivo: File, idUsuario: string, ruta: string) {

  this.subirArchivoService.subirArchivo(archivo, 'imagen', idUsuario).then( (resp: any) => {
      console.log('then subir imagen', resp);
      window.scroll(0, 0);
      if (idUsuario === resp.usuario._id) {
        console.log('aquiiii');
        this.guardarEnStorage(this.token, resp.usuario);
      }

      console.log('aquiii router');
      this.router.navigate([ruta]);
  }).catch( resp => {
      console.log('cath subir imagen', resp);
  });
}


// ======================================
// Menu según rol
// ======================================

menu(rol) {

  if (rol === 'Admin') {
    return {
      menu : [{
        modulo: 'Perfil y Organización',
        activo: true,
        subMenu: [{
                nombre: 'Inicio',
                ruta: '/home',
                icono: 'fa fa-home',
                ver: true,
                permisos: { crear: true, eliminar: true, editar: true }
            },
            {
                nombre: 'Perfil',
                ruta: '/perfil',
                icono: 'fa fa-user',
                ver: true,
                permisos: { crear: true, eliminar: true, editar: true }
            },
            {
                nombre: 'Empresa',
                ruta: '/empresa',
                icono: 'fa fa-institution',
                ver: true,
                permisos: { crear: true, eliminar: true, editar: true }
            }
        ]
    },

    {
        modulo: 'Administración',
        activo: true,
        subMenu: [{
                nombre: 'Gestionar Usuarios',
                ruta: '/usuarios',
                icono: 'fa fa-users',
                ver: true,
                permisos: { crear: true, eliminar: true, editar: true }
            },
            {
                nombre: 'Gestionar Convenios',
                ruta: '/convenios',
                icono: 'fa fa-institution',
                ver: true,
                permisos: { crear: true, eliminar: true, editar: true }
            },
            {
                nombre: 'Gestionar Planes',
                ruta: '/planes',
                icono: 'fa fa-book',
                ver: true,
                permisos: { crear: true, eliminar: true, editar: true }
            }
        ]
    },

    {
        modulo: 'Funcionalidades',
        activo: true,
        subMenu: [{
            nombre: 'Gestionar Contratos',
            ruta: '/contratos',
            icono: 'fa fa-book',
            ver: true,
            permisos: { crear: true, eliminar: true, editar: true }
        }]
    }
    ]
    };
  }


  return {
    menu : [{
      modulo: 'Perfil y Organización',
      activo: true,
      subMenu: [{
              nombre: 'Inicio',
              ruta: '/home',
              icono: 'fa fa-home',
              ver: true,
              permisos: { crear: true, eliminar: true, editar: true }
          },
          {
              nombre: 'Perfil',
              ruta: '/perfil',
              icono: 'fa fa-user',
              ver: true,
              permisos: { crear: true, eliminar: true, editar: true }
          },
          {
              nombre: 'Empresa',
              ruta: '/empresa',
              icono: 'fa fa-institution',
              ver: false,
              permisos: { crear: false, eliminar: false, editar: false }
          }
      ]
  },

  {
    modulo: 'Administración',
    activo: false,
    subMenu: [{
            nombre: 'Gestionar Usuarios',
            ruta: '/usuarios',
            icono: 'fa fa-users',
            ver: false,
            permisos: { crear: false, eliminar: false, editar: false }
        },
        {
            nombre: 'Gestionar Convenios',
            ruta: '/convenios',
            icono: 'fa fa-institution',
            ver: false,
            permisos: { crear: false, eliminar: false, editar: false }
        },
        {
            nombre: 'Gestionar Planes',
            ruta: '/planes',
            icono: 'fa fa-book',
            ver: false,
            permisos: { crear: false, eliminar: false, editar: false }
        }
    ]
  },

  {
      modulo: 'Funcionalidades',
      activo: true,
      subMenu: [{
          nombre: 'Gestionar Contratos',
          ruta: '/contratos',
          icono: 'fa fa-book',
          ver: true,
          permisos: { crear: true, eliminar: true, editar: true }
      }]
  }
  ]
  };

}


}
