import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
 public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    let idEmpresa = this.usuarioService.cargarInfo().usuario.empresa._id;
    this.getUsuarios(idEmpresa);
  }

  getUsuarios(idEmpresa) {
    this.usuarioService.getUsuarios(idEmpresa).subscribe( usuarios => this.usuarios = usuarios );
  }

  editarUsuario(user: Usuario) {

    let idEmpresa = this.usuarioService.cargarInfo().usuario.empresa._id;

    // console.log(user.empresa._id, idEmpresa);

    if (user.empresa._id === idEmpresa) {
      // console.log(' puede editar');
      this.router.navigate(['/editar-usuario', user._id]);
      return;
    }

    Swal.fire('Restringido', 'No tiene permiso', 'warning');
  }

}
