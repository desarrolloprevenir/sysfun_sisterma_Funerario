import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
 public usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    let idEmpresa = this.usuarioService.cargarInfo().usuario.empresa._id;
    this.getUsuarios(idEmpresa);
  }

  getUsuarios(idEmpresa) {
    this.usuarioService.getUsuarios(idEmpresa).subscribe( usuarios => this.usuarios = usuarios );
  }

}
