import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../models/usuario.model';



@Component({
  selector: 'app-pagina',
  templateUrl: './pagina.component.html',
  styles: []
})
export class PaginaComponent implements OnInit {
  public usuario: Usuario;
  public menu: any;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    // console.log(this.usuarioService.cargarInfo().usuario);
    this.usuario = this.usuarioService.cargarInfo().usuario;
  }

}
