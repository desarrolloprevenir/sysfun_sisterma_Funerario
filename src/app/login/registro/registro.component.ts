import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidacionesFormService } from '../../services/validaciones/validaciones-form.service';
import { EncriptarService } from '../../services/validaciones/encriptar.service';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {

  public formulario: FormGroup;
  public numerosValic = [];
  public valido: string;

  constructor(private validacionesFormService: ValidacionesFormService,
              private encriptarService: EncriptarService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.iniciarFormulario();
    this.iniciarValidacionNumeros();
  }

  iniciarFormulario() {

    this.formulario = new FormGroup({
        empresa : new FormControl('', [Validators.required]),
        nit : new FormControl('', [Validators.required]),
        codigoNit : new FormControl('', [Validators.required]),
        telefonoEmpresa : new FormControl('', [Validators.required]),
        direccion : new FormControl('', [Validators.required]),
        // departamento : new FormControl('', []),
        // municipio : new FormControl('', []),

        // datos representante legal

        nombres : new FormControl(null, [Validators.required, Validators.pattern('[a-z A-z ñ]*')]),
        apellidos : new FormControl(null, [Validators.required, Validators.pattern('[a-z A-z ñ]*')]),
        cedula : new FormControl(null, [Validators.required]),
        telefono : new FormControl(null, [Validators.required]),
        email : new FormControl(null, [Validators.required,  Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
        contrasena : new FormControl(null, [Validators.required, Validators.minLength(8)]),
        contrasena2 : new FormControl(null, [Validators.required, Validators.minLength(8)]),

    });

    // this.formulario.setValue({
    //   empresa: 'Yo vany',
    //   nit: 7202020,
    //   codigoNit: 20,
    //   telefonoEmpresa: 7202020,
    //   direccion: 'calle siempre viva',
    //   nombres: 'carlos',
    //   apellidos: 'maroz',
    //   usuario: 'pepePrueba',
    //   cedula: 202020200,
    //   telefono: 7202020,
    //   email: 'correo@correo.com',
    //   contrasena: '12345678',
    //   contrasena2: '12345678',
    // });

  }

  registrarEmpresa() {

    // console.log('registro');
    if (this.validacionFormulario() === true) {
        this.valido = 'valido';

        let usuario = new Usuario (null, this.formulario.value.cedula, this.formulario.value.nombres, this.formulario.value.apellidos,
                                   this.formulario.value.email, 'Representante Legal',
                                   this.encriptarService.encriptar(this.formulario.value.contrasena), this.formulario.value.telefono,
                                   this.formulario.value.nit, [], {rol: 'Super Admin', opciones: [] } );

        let provedor = {
          nit : this.formulario.value.nit,
          codigoNit : this.formulario.value.codigoNit,
          nombre : this.formulario.value.empresa,
          direccion : this.formulario.value.direccion,
          telefono : this.formulario.value.telefonoEmpresa,
          usuario
        };
        // console.log(provedor);
        this.usuarioService.registrarProvedor(provedor).subscribe();
    } else {
        this.valido = 'invalido';
    }

    // console.log(this.valido);
  }

  validacionFormulario() {

    for (let f of this.numerosValic) {
      // console.log(f);
      if (!f.validacion) {
        return false;
      }
    }

    // console.log(this.formulario.value);

    if (this.formulario.valid) {
        return true;
    }

  }

  lengthNumeros(ev: any, valor1: number, valor2: number) {

    if (!ev.target.value) {
      return;
    }

    let campo: any;
    let p: any;
    let nombre: string;
    let posicion: number;

    campo = document.getElementById(ev.target.name);
    p = document.getElementById('p-' + ev.target.name);
    nombre = ev.target.name;

    switch (nombre) {

      case 'telefonoEmpresa' :
        posicion = 0;
        break;

      case 'nit' :
        posicion = 1;
        break;

      case 'cedula' :
        posicion = 2;
        break;

      case 'telefono' :
        posicion = 3;
        break;
    }

    if ( !this.validacionesFormService.lengthNumeros(ev.target.value, valor1, valor2)) {
      campo.className = 'form-control is-invalid';
      p.style.display = '';
      this.numerosValic[posicion].validacion = false;
    } else {
      campo.className = 'form-control';
      p.style.display = 'none';
      this.numerosValic[posicion].validacion = true;
    }

    // console.log(this.numerosValic);

  }

  iniciarValidacionNumeros() {
    this.numerosValic.push({campo:  'telefonoEmpresa', validacion: false});
    this.numerosValic.push({campo: 'nit', validacion: false});
    this.numerosValic.push({campo: 'cedula', validacion: false});
    this.numerosValic.push({campo: 'telefono', validacion: false});
  }

}
