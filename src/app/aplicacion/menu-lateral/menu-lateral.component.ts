import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styles: []
})
export class MenuLateralComponent implements OnInit {
  // @ViewChild('menuPerfil', {static : true}) menuPerfil: ElementRef;
  iconoPerfil = 'arriba';
  @Input() usuario: Usuario;
  public menu: any;

  constructor() { }

  cambiaEstado(idMenu: string) {
    // console.log(this.iconoPerfil);

    let campo: any;

    if (this.iconoPerfil === 'abajo') {
      this.iconoPerfil = 'arriba';
      campo = document.getElementById(idMenu);
      campo.className = 'fa fa-chevron-down';
      return;
    }

    this.iconoPerfil = 'abajo';
    campo = document.getElementById(idMenu);
    campo.className = 'fa fa-chevron-up';
    // console.log(this.iconoPerfil);

  }

  ngOnInit() {
    this.menu = this.usuario.menu;
    // console.log('menu', this.menu);
  }

}
