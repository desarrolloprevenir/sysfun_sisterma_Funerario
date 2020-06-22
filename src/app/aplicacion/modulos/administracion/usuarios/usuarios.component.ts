import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../../environments/environment.prod';
import { ComunicacionComponentesService } from '../../../../services/comunicacion/comunicacion-componentes.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
 public usuarios: Usuario[] = [];
 public idUsuario;
 public apiUrl = environment.ApiUrl;
 public idEmpresa: string;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private comunicacionService: ComunicacionComponentesService) { }

  ngOnInit() {
    this.idEmpresa = this.usuarioService.cargarInfo().usuario.empresa._id;
    this.idUsuario =  this.usuarioService.cargarInfo().usuario._id;
    this.getUsuarios(this.idEmpresa);
    // this.comunicacionService.notificacion.subscribe( () => this.getUsuarios(this.idEmpresa));
  }

  getUsuarios(idEmpresa) {

    this.usuarioService.getUsuarios(idEmpresa).subscribe( usuarios => this.usuarios = usuarios );
  }

  editarUsuario(user: Usuario) {



    // console.log(user.empresa._id, idEmpresa);

    if (user.empresa._id === this.idEmpresa) {
      // console.log(' puede editar');
      this.router.navigate(['/editar-usuario', user._id]);
      return;
    }

    Swal.fire('Restringido', 'No tiene permiso', 'warning');
  }

  eliminarUsuario(user: Usuario) {

    // console.log(user);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-danger',
        cancelButton: 'btn btn-secondary'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: 'que deseas eliminar a ' + user.nombres,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      // console.log('boton', result);
      if (result.value) {
          this.usuarioService.dltUser(user._id).subscribe();
      }
    });
  }

}
