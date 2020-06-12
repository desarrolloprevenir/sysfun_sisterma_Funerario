import { Component, OnInit, Input } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-top-navegation',
  templateUrl: './top-navegation.component.html',
  styles: []
})
export class TopNavegationComponent implements OnInit {
  @Input() usuario: Usuario;

  constructor(public usuarioService: UsuarioService) { }

  ngOnInit() {
  }

}
