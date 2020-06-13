import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ValidacionesFormService } from '../../../../services/validaciones/validaciones-form.service';
import { Usuario } from 'src/app/models/usuario.model';
import { EncriptarService } from '../../../../services/validaciones/encriptar.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styles: []
})
export class CrearUsuarioComponent implements OnInit {

  public formUsuario: FormGroup;
  public menuyPermisos: any;

  constructor(private usuarioService: UsuarioService,
              private validaciones: ValidacionesFormService,
              private encriptar: EncriptarService) { }

  ngOnInit() {
    this.inicializarFormulario();
  }

  inicializarFormulario() {

    this.formUsuario = new FormGroup({
        nombres : new FormControl ('', [Validators.required, Validators.pattern('[A-Z a-z ñ]*')]),
        apellidos : new FormControl ('', [Validators.required, Validators.pattern('[A-Z a-z ñ]*')]),
        cedula : new FormControl ('', [Validators.required]),
        telefono : new FormControl ('', [Validators.required]),
        correo : new FormControl ('', [Validators.required, Validators.email]),
        contrasena : new FormControl ('', [Validators.required, Validators.minLength(8)]),
        confirmContrasena : new FormControl ('', [Validators.required]),
        cargo : new FormControl ('', [Validators.required]),
        rol : new FormControl ('Rol', [Validators.required]),
    });

  }

  menu(ev) {
    this.menuyPermisos = this.usuarioService.menu(ev.target.value);
    this.menuyPermisos = this.menuyPermisos.menu;
    // console.log(this.menuyPermisos);
  }

  switchModulo(ev, modulo) {
    this.menuyPermisos[modulo].activo = ev.target.checked;
  }

  checkboxPermisos(ev, modulo, subMenu, permiso) {
    // console.log(ev);
    // console.log('Menu', modulo, subMenu);

    switch (permiso) {

      case 'ver' :
        this.menuyPermisos[modulo].subMenu[subMenu].ver = ev.target.checked;
        break;

      case 'editar' :
        this.menuyPermisos[modulo].subMenu[subMenu].permisos.editar = ev.target.checked;
        this.menuyPermisos[modulo].subMenu[subMenu].ver = true;
        break;

      case 'eliminar' :
        this.menuyPermisos[modulo].subMenu[subMenu].permisos.eliminar = ev.target.checked;
        this.menuyPermisos[modulo].subMenu[subMenu].ver = true;
        break;

      default :
        this.menuyPermisos[modulo].subMenu[subMenu].permisos.crear = ev.target.checked;
        this.menuyPermisos[modulo].subMenu[subMenu].ver = true;
        break;
    }
  }

  registrarUsuario() {

    // Validaciones
    console.log('validando ...');

    // Contraseñas
    if (this.formUsuario.value.contrasena !== this.formUsuario.value.confirmContrasena) {
        window.scroll(0, 0);
        return;
    }

    // Validacion de formulario
    if (this.formUsuario.invalid) {
      window.scroll(0, 0);
 }

    // Validación length de numero de celular
    if (!this.validacionLenght(this.formUsuario.value.telefono, 7, 12, 'pContacto' )) {
        console.log('fallo numero de contacto');
        window.scroll(0, 0);
        return;
    }

    // Validación length de cedula
    if (!this.validacionLenght(this.formUsuario.value.telefono, 7, 12, 'pContacto' )) {
       console.log('fallo numero de cedula');
       window.scroll(0, 0);
       return;
  }

    // Validar que haya al menos un modulo activo
    var modulos = [];
    // Validar que un modulo que este activo tenga al menos una funcionalidad visible
    var busqueda = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.menuyPermisos.length; i++ ) {
      busqueda = [];
      modulos.push(this.menuyPermisos[i].activo);
      if (this.menuyPermisos[i].activo) {

        // tslint:disable-next-line: prefer-for-of
        for (let j = 0; j < this.menuyPermisos[i].subMenu.length; j++) {
          busqueda.push(this.menuyPermisos[i].subMenu[j].ver);
        }

        let resultado = busqueda.indexOf(true);
        if (resultado < 0) {
          Swal.fire('Advertencia',
                    'El modulo ' + this.menuyPermisos[i].modulo + ', esta activo pero no tiene ninguna funcionalidad visible.',
                    'warning');
          return;
        }
      }
    }

    let resultado = modulos.indexOf(true);

    if (resultado < 0) {
      Swal.fire('Advertencia', 'Al menos debe haber un modulo activo', 'warning');
      return;
    }

    // Guardar usuario
    console.log('guardando usuario');

    let usuario = new Usuario('', this.formUsuario.value.cedula,  this.formUsuario.value.nombres,  this.formUsuario.value.apellidos, 
    this.formUsuario.value.correo,  this.formUsuario.value.cargo, this.encriptar.encriptar( this.formUsuario.value.contrasena),
    this.formUsuario.value.telefono, '',  this.menuyPermisos, {rol: this.formUsuario.value.rol, opciones: []} );

    console.log(usuario);
  }


  validacionLenght(numero: string, valor1: number, valor2: number, id: string): boolean {

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
