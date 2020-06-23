import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidacionesFormService } from '../../../../services/validaciones/validaciones-form.service';
import { Usuario } from '../../../../models/usuario.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { environment } from '../../../../../environments/environment.prod';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ComunicacionComponentesService } from '../../../../services/comunicacion/comunicacion-componentes.service';
import { MenuLateralComponent } from '../../../menu-lateral/menu-lateral.component';
import { TopNavegationComponent } from '../../../top-navegation/top-navegation.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: []
})
export class PerfilComponent implements OnInit {
  public formUsuario: FormGroup;
  public imagenTem: any;
  public imagenSubir: File;
  public menuyPermisos;
  public user: Usuario;

  constructor(private validaciones: ValidacionesFormService,
              private usuarioService: UsuarioService,
              private comunicacionService: ComunicacionComponentesService,
              private router: Router
              ) { }

  ngOnInit() {
    this.user = this.usuarioService.cargarInfo().usuario;
    this.imagenTem = environment.ApiUrl + '/imagenes/' + this.user.imagen;
    this.menuyPermisos = this.user.menu;
    this.inicializarForm();
  }

  inicializarForm() {

    this.formUsuario = new FormGroup({
      nombres : new FormControl (this.user.nombres || '', [Validators.required, Validators.pattern('[A-Z a-z ñ]*')]),
      apellidos : new FormControl (this.user.apellidos || '', [Validators.required, Validators.pattern('[A-Z a-z ñ]*')]),
      cedula : new FormControl (this.user.cedula || '', [Validators.required]),
      telefono : new FormControl (this.user.telefono || '', [Validators.required]),
      correo : new FormControl (this.user.correo || '', [Validators.required, Validators.email]),
      contrasena : new FormControl (this.user.contrasena, [Validators.required, Validators.minLength(8)]),
      confirmContrasena : new FormControl (this.user.contrasena, [Validators.required]),
      cargo : new FormControl (this.user.cargo || '', [Validators.required]),
      rol : new FormControl (this.user.rol.rol || '', [Validators.required]),
  });
  }

  selecionarImagen(imagen: File) {
    if (!imagen) {
      this.imagenSubir = null;
      return;
    }

    // console.log(imagen);
    if (imagen.type.indexOf('image') < 0) {
      Swal.fire('Solo imagenes', 'El archivo seleccionado no es una imagen', 'warning');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = imagen;
    let reader = new FileReader();
    reader.readAsDataURL(imagen);
    reader.onloadend = () => this.imagenTem = reader.result;
  }

  editarUsuario() {

    if (this.formUsuario.invalid) {
      window.scroll(0, 0);
    }

    // Validación length de numero de celular
    if (!this.validacionLenght(this.formUsuario.value.telefono, 7, 12, 'pContacto' )) {
      // console.log('fallo numero de contacto');
      window.scroll(0, 0);
      return;
    }

    this.user.nombres = this.formUsuario.value.nombres;
    this.user.apellidos = this.formUsuario.value.apellidos;
    this.user.telefono = this.formUsuario.value.telefono;

    // console.log(this.user);

    this.usuarioService.editUser(this.user).subscribe( res => {
      if (res.ok) {
        if (this.imagenSubir) {
            this.subirImagen(res.idUsuario);
            this.router.navigateByUrl('/pagina', {skipLocationChange: true}).then(()=>
            this.router.navigate(['/perfil']));
        } else {
            window.scroll(0, 0);
        }
        // window.location.reload();
        // let link = ['Landing'];
        this.router.navigateByUrl('/pagina', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/perfil']));
        return;
      }
      window.scroll(0, 0);
    });


  }

  subirImagen(idUsuario) {
    this.usuarioService.cambiarImagen(this.imagenSubir, idUsuario, '/perfil');
    return;
  }



  validacionLenght(numero: string, valor1: number, valor2: number, id: string): boolean {

    if ( ( !numero)  || (!valor1) || (!valor2) ) {
      return;
    }

    var campo: any;
    if (!this.validaciones.lengthNumeros(numero.toString(), valor1, valor2)) {
      campo = document.getElementById(id);
      campo.style.display = '';
      return false;
    }

    campo = document.getElementById(id);
    campo.style.display = 'none';
    return true;
  }


}
