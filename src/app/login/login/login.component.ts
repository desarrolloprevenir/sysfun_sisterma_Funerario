import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EncriptarService } from '../../services/validaciones/encriptar.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  constructor(private encriptarService: EncriptarService,
              private usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  iniciarSesion( form: NgForm ) {
    if (form.invalid) {
      return;
    }
    let usuario = {correo: form.value.correo, contrasena: this.encriptarService.encriptar(form.value.contrasena)};
    // console.log(usuario);
    this.usuarioService.login(usuario).subscribe();
  }

}
