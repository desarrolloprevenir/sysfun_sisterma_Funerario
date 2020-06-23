import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import Swal from 'sweetalert2';
import { ValidacionesFormService } from '../../../../services/validaciones/validaciones-form.service';
import { Usuario } from 'src/app/models/usuario.model';
import { EncriptarService } from '../../../../services/validaciones/encriptar.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../../../environments/environment.prod';
import { ComunicacionComponentesService } from '../../../../services/comunicacion/comunicacion-componentes.service';

@Component({
  selector: 'app-crear-editar',
  templateUrl: './crear-editar.component.html',
  styles: []
})
export class CrearEditarComponent implements OnInit {

  public formUsuario: FormGroup;
  public menuyPermisos: any;
  public usuario: Usuario;
  public usuarioEdit: Usuario;
  public editar: string;
  public cambioContrasena = false;
  public imagenTem: any;
  public imagenSubir: File;

  constructor(private usuarioService: UsuarioService,
              private validaciones: ValidacionesFormService,
              private encriptar: EncriptarService,
              private router: Router,
              private activatedRouter: ActivatedRoute,
              private comunicacionService: ComunicacionComponentesService) { }


  // Ciclos de vida
  ngOnInit() {

    this.activatedRouter.params.subscribe( idUsuario => {

      // Editar
      if (idUsuario.idUsuario) {
        // peticion api
        this.getUser(idUsuario.idUsuario);
        return;
      }

      // Crear
      this.inicializarFormulario();
      this.imagenTem = environment.ApiUrl + '/imagenes/user.png';
      this.editar = 'crear';
    });
  }

  // Fin


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




  // ----------------------------------------------- METODOS EDITAR --------------------------------------------------------- //


  inicializarFormularioEdit() {

    this.formUsuario = new FormGroup({
        nombres : new FormControl (this.usuarioEdit.nombres || '', [Validators.required, Validators.pattern('[A-Z a-z ñ]*')]),
        apellidos : new FormControl (this.usuarioEdit.apellidos || '', [Validators.required, Validators.pattern('[A-Z a-z ñ]*')]),
        cedula : new FormControl (this.usuarioEdit.cedula || '', [Validators.required]),
        telefono : new FormControl (this.usuarioEdit.telefono || '', [Validators.required]),
        correo : new FormControl (this.usuarioEdit.correo || '', [Validators.required, Validators.email]),
        contrasena : new FormControl (12345, [Validators.required, Validators.minLength(8)]),
        confirmContrasena : new FormControl (12345, [Validators.required]),
        cargo : new FormControl (this.usuarioEdit.cargo || '', [Validators.required]),
        rol : new FormControl (this.usuarioEdit.rol.rol || '', [Validators.required]),
    });

  }


  getUser(idUsuario) {
    this.usuarioService.getUsuario(idUsuario)
                       .subscribe( usuario => {

                        this.usuarioEdit = usuario;
                        this.menuyPermisos = this.usuarioEdit.menu;
                        this.imagenTem = environment.ApiUrl + '/imagenes/' + this.usuarioEdit.imagen;
                        this.inicializarFormularioEdit();
                        this.editar = 'editar';
    });
  }


  cambioContra() {
    this.cambioContrasena = !this.cambioContrasena ? true : false;

    var btn: any = document.getElementById('btn-cambio-contra');
    if (this.cambioContrasena) {
        btn.className = 'btn btn-secondary';
        btn.innerText = 'Cancelar cambio Contraseña';
        return;
    }

    btn.className = 'btn btn-primary';
    btn.innerText = 'Cambiar Contraseña';
  }

  // ------------------------------------------------ METODOS CREAR --------------------------------------------------------- //

  menu(ev) {
    document.getElementById('pRol').style.display = 'none';
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

  registrarEditarUsuario() {

    // Validaciones
    // console.log('validando ...');

    // ROL

    if (this.formUsuario.value.rol === 'Rol') {
        document.getElementById('pRol').style.display = '';
        return;
    }


    // Contraseñas

    // Editar

    if (this.editar === 'editar') {

      if (this.cambioContrasena) {
        // Confirmando que las contraseñas sean iguales
        if (this.formUsuario.value.contrasena !== this.formUsuario.value.confirmContrasena) {
          window.scroll(0, 0);
          return;
      }
        // Nueva contraseña a usuario a editar
        this.usuarioEdit.contrasena = this.encriptar.encriptar(this.formUsuario.value.contrasena);
      }

    } else  {

      // Crear
      if (this.formUsuario.value.contrasena !== this.formUsuario.value.confirmContrasena) {
      window.scroll(0, 0);
      return;
  }

    }



    // Validacion de formulario
    if (this.formUsuario.invalid) {
      window.scroll(0, 0);
 }

    // Validación length de numero de celular
    if (!this.validacionLenght(this.formUsuario.value.telefono, 7, 12, 'pContacto' )) {
        // console.log('fallo numero de contacto');
        window.scroll(0, 0);
        return;
    }

    // Validación length de cedula
    if (!this.validacionLenght(this.formUsuario.value.telefono, 7, 12, 'pContacto' )) {
      //  console.log('fallo numero de cedula');
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
    // console.log('guardando usuario');

    this.usuario = this.usuarioService.cargarInfo().usuario;

    // crear usuario

    if (this.editar === 'crear') {

    let usuario = new Usuario('', this.formUsuario.value.cedula,  this.formUsuario.value.nombres,  this.formUsuario.value.apellidos,
    this.formUsuario.value.correo,  this.formUsuario.value.cargo, this.encriptar.encriptar( this.formUsuario.value.contrasena),
    this.formUsuario.value.telefono, '',  this.menuyPermisos, {rol: this.formUsuario.value.rol, opciones: []}, '',
     {_id : this.usuario.empresa._id, nombre: '', nit : '', direccion : '', telefono: ''},
     {_id: this.usuario.creadoPor._id, cargo: '', nombres: '', apellidos : ''});

    // console.log(usuario);

    this.usuarioService.registrarUsuario(usuario).subscribe( res => {
      if (res.ok) {

        if (this.imagenSubir) {
            this.subirImagen(res.idUsuario);
        } else {
            this.router.navigate(['/usuarios']);
            window.scroll(0, 0);
            return;
        }
      }

      window.scroll(0, 0);
    } );

    } else {

      // Editar usuario

      this.usuarioEdit.apellidos = this.formUsuario.value.apellidos;
      this.usuarioEdit.nombres = this.formUsuario.value.nombres;
      this.usuarioEdit.cargo = this.formUsuario.value.cargo;
      this.usuarioEdit.rol.rol = this.formUsuario.value.rol;
      this.usuarioEdit.telefono = this.formUsuario.value.telefono;
      this.usuarioEdit.menu = this.menuyPermisos;

      console.log('editar', this.usuarioEdit);
      this.usuarioService.editUser(this.usuarioEdit).subscribe( res => {
        if (res.ok) {
          if (this.imagenSubir) {
              this.subirImagen(res.idUsuario);
          } else {
              this.router.navigate(['/usuarios']);
              window.scroll(0, 0);
              return;
          }
        }
        window.scroll(0, 0);
      });

    }
  }

  subirImagen(idUsuario) {
    this.usuarioService.cambiarImagen(this.imagenSubir, idUsuario, '/usuarios');
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

}
