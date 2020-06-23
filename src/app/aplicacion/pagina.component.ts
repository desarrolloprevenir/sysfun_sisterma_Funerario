import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';
import { ComunicacionComponentesService } from '../services/comunicacion/comunicacion-componentes.service';

@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styles: []
})
export class PaginaComponent implements OnInit {
  @ViewChild('contenedor', {static : true}) contenedor;
  public usuario: Usuario;
  public menu: any;
  public suscripcion;
  public altura;

  constructor(public usuarioService: UsuarioService,
              public comunicacionService: ComunicacionComponentesService) { }

  ngOnInit() {
    // console.log(this.usuarioService.cargarInfo().usuario);
    this.usuario = this.usuarioService.cargarInfo().usuario;
    this.altura = screen.height;
  }

}
