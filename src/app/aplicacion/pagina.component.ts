import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { ComunicacionComponentesService } from '../services/comunicacion/comunicacion-componentes.service';
import { PerfilComponent } from './modulos/perfil_y_organizacion/perfil/perfil.component';



@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styles: []
})
export class PaginaComponent implements OnInit {
  public usuario: Usuario;
  public menu: any;
  public suscripcion;

  constructor(public usuarioService: UsuarioService,
              public comunicacionService: ComunicacionComponentesService) { }

  ngOnInit() {
    // console.log(this.usuarioService.cargarInfo().usuario);
    this.usuario = this.usuarioService.cargarInfo().usuario;

  }

  cargarInfo() {
    console.log('aqui');
    this.comunicacionService.getNavChangeEmitter().subscribe( notificacion => console.log(notificacion) );
  }

}
