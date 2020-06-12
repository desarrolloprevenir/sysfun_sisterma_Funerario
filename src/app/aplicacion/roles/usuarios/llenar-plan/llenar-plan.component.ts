import { Component, OnInit, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-llenar-plan',
  templateUrl: './llenar-plan.component.html',
  styles: []
})
export class LlenarPlanComponent implements OnInit {

  @ViewChild('contenedor', {static : true}) contenedor;

  public departamento = new FormControl ('', Validators.required);
  public formTitular: FormGroup;
  public formsBeneficiario: any = [];
  public departamentos;
  public municipios;
  public intervalo;
  public valorSuscripcionTitular = 20000;
  public valorSuscripcionBeneficiario = 23000;
  public validarFormulario: string;
  public parentescos = [{id_parentescos: 1 , nombre: 'mi parentesco'}];
  public today;
  public beneficiarios = [];
  public status: string;
  public statusText: string;
  public infoBeneficiarios = [];

  constructor() {
    this.today = moment(new Date().toISOString()).format('YYYY-MM-DD');
   }

  ngOnInit() {
    this.inicializarFormulario();
    // this.getDepartamentos();
    this.getParentescos();
    this.departamento.valueChanges.subscribe( () => {
      // this.departamentoSelect();
    } );
  }


  inicializarFormulario() {

    this.formTitular = new FormGroup ({

      nombres : new FormControl ('', [Validators.required]),
      apellidos : new FormControl ('', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Z a-z ñ]*')]),
      tipoDocumento : new FormControl ('', [Validators.required]),
      estadoCivil : new FormControl ('', [Validators.required]),
      lugarExpedicion : new FormControl ('', [Validators.required]),
      fechaNacimiento : new FormControl ('', [Validators.required]),
      numeroIdentificacion : new FormControl ('', [Validators.required, Validators.pattern('[0-9]*')]),
      email : new FormControl ('', [Validators.required, Validators.email,
                                     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      direccion: new FormControl ('', [Validators.required]),
      numeroCelular : new FormControl ('', [Validators.required, Validators.pattern('[0-9]*')]),
      municipio : new FormControl (2, [Validators.required]),
      barrio : new FormControl ('', [Validators.required]),
      profesion : new FormControl (''),

    });


    // this.formTitular = this.fb.group({

    //   nombres : ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Z a-z ñ]*')]],
    //   apellidos : ['', [Validators.required, Validators.minLength(3), Validators.pattern('[A-Z a-z ñ]*')]],
    //   tipoDocumento : ['', [Validators.required]],
    //   numeroIdentificacion : ['', [Validators.required, Validators.pattern('[0-9]*')]],
    //   email : ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    //   numeroCelular : ['', [Validators.required, Validators.pattern('[0-9]*')]],
    //   municipio : ['', [Validators.required]],
    //   direccion : ['', [Validators.required]],
    //   barrio : ['', [Validators.required]],
    //   profesion : [''],
    //   empresaDondeLabora : ['']

    // });
}

getParentescos() {

  // this.appService.getParentesco().subscribe( parentescos => {
  //   this.parentescos = parentescos;
  // }, err => console.log('parentescos' , err)  );
}

// departamentoSelect() {
//   this.getMunicipios(this.departamento.value);
// }

// getDepartamentos() {
//   this.appService.getDepartamentos().subscribe( departamentos => {
//     this.departamentos = departamentos;
//     // console.log(this.departamentos);
//   }, err => {
//   console.log('error get departamentos');
//   } );
// }

// getMunicipios(idDepartamento) {

//   this.appService.getMunicipios(idDepartamento).subscribe( municipios => {
//     this.municipios = municipios;
//     // console.log(this.municipios);
//   }, err => {
//   console.log('error get municipios');
//   } );
// }

agregarBeneficiario() {


  // console.log(this.formTitular.valid);

  if (this.formsBeneficiario.length <= 0) {

    if (this.validacionesFormularios() === 'valido') {
      this.formsBeneficiario.push({formulario : 'form'});
      this.intervalo =  setInterval(() => {
      document.getElementById('btn-scroll').click();
      }, 1);
    } else {
      this.status = 'error';
      this.statusText = 'Por favor llena los campos requeridos';
   }

  } else {

     let posicion = this.formsBeneficiario.length - 1;
     let formValido = [{campo : 'nombres', bol: false },
                       {campo : 'apellidos', bol: false },
                       {campo : 'tipoDocumento', bol: false },
                       {campo : 'parentesco', bol: false },
                       {campo : 'numeroDocumento', bol: false },
                       {campo : 'fechaNacimiento', bol: false },
                       {campo : 'numeroCelular', bol: false }];

     // Nombre
     let nombre: any = document.getElementById('nombres' + posicion);
     nombre = nombre.value;

     // Validaciones nombre
     if (this.validacionCadenaDeTexto(nombre, 'nombre', posicion) === 'caracteres_validos') {
        formValido[0].bol = true;
    }

     // apellido
     let apellido: any = document.getElementById('apellidos' + posicion);
     apellido = apellido.value;

     // Validaciones apellido
     if (this.validacionCadenaDeTexto(apellido, 'apellido', posicion) === 'caracteres_validos') {
      formValido[1].bol = true;
     }

     // Tipo de documento
     let tipoDocumento: any = document.getElementById('tipoDocumento' + posicion);
     tipoDocumento = tipoDocumento.value;

     // Validaciones tipo de documento
     if (this.validacionesRequire(tipoDocumento, 'tipoDocumento', posicion) === 'valido') {
      formValido[2].bol = true;
     }

     // Parentesco
     let parentesco: any = document.getElementById('parentesco' + posicion);
     parentesco = parentesco.value;

     // Validaciones de parentesco
     if (this.validacionesRequire(parentesco, 'parentesco', posicion) === 'valido') {
      formValido[3].bol = true;
     }

     // número de documento
     let numeroDocumento: any = document.getElementById('numeroDocumento' + posicion);
     numeroDocumento = numeroDocumento.value;

     // validaciones numero de documento
     if ( this.validacionNumeros(numeroDocumento, 'numeroDocumento', posicion) === 'numero_valido') {
      formValido[4].bol = true;
     }

     // Fecha de nacimiento
     let fechaNacimiento: any = document.getElementById('fechaNacimiento' + posicion);
     fechaNacimiento = fechaNacimiento.value;

     // Validaciones fecha de nacimiento
     if (this.validacionesRequire(fechaNacimiento, 'fechaNacimiento', posicion) === 'valido') {
      formValido[5].bol = true;
     }

     // Numero de celular
     let numeroCelular: any = document.getElementById('numeroCelular' + posicion);
     numeroCelular = numeroCelular.value;

     // validaciones numero de celular
     if ( this.validacionNumeros(numeroCelular, 'numeroCelular', posicion) === 'numero_valido') {
      formValido[6].bol = true;
     }

     var bol: boolean;

     //  console.log(formValido);
     // tslint:disable-next-line: prefer-for-of
     for (let i = 0; i < formValido.length; i++) {

      bol = formValido[i].bol;
      if (bol === false) {
          console.log('por aquii');
          break;
      }
     }

     if (bol === true) {
      this.formsBeneficiario.push({formulario : 'form'});
     }
  }

}

scroll() {
  let coordenadaY: number;
  coordenadaY = this.contenedor.nativeElement.offsetHeight;
  // console.log('aqui scroll', coordenadaY);
  window.scrollTo(0 , coordenadaY);
  clearInterval(this.intervalo);
}

guardarContrato() {

  if (this.validacionesFormularios() === 'valido') {
      console.log('generar recibo');
      window.alert('Generar recibo');
  } else {
    console.log('algo anda mal');
    window.alert('Algo anda mal, por favor revisa que los formularios estes completos.');
  }
  // console.log(this.formTitular);
}

validacionesFormularios(): string {

   // CASOS

  // SOLO SE INCRIBA EL TITULAR

  if (this.formsBeneficiario.length <= 0) {

    if (this.formTitular.valid) {
        //  console.log('valido');
         this.validarFormulario = 'valido';
         return 'valido';
    } else {
         this.validarFormulario = 'invalido';
         return 'invalido';
        //  console.log('invalido');
    }
 } else {
    // TITULAR Y BENEFICIARIOS
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.formsBeneficiario.length; i++) {

          let formValido = [{campo : 'nombres', bol: false },
                        {campo : 'apellidos', bol: false },
                        {campo : 'tipoDocumento', bol: false },
                        {campo : 'parentesco', bol: false },
                        {campo : 'numeroDocumento', bol: false },
                        {campo : 'fechaNacimiento', bol: false },
                        {campo : 'numeroCelular', bol: false }];

          // Nombre
          let nombre: any = document.getElementById('nombres' + i);
          nombre = nombre.value;

          // Validaciones nombre
          if (this.validacionCadenaDeTexto(nombre, 'nombre', i) === 'caracteres_validos') {
              formValido[0].bol = true;
          }

          // apellido
          let apellido: any = document.getElementById('apellidos' + i);
          apellido = apellido.value;

          // Validaciones apellido
          if (this.validacionCadenaDeTexto(apellido, 'apellido', i) === 'caracteres_validos') {
            formValido[1].bol = true;
          }

          // Tipo de documento
          let tipoDocumento: any = document.getElementById('tipoDocumento' + i);
          tipoDocumento = tipoDocumento.value;

          // Validaciones tipo de documento
          if (this.validacionesRequire(tipoDocumento, 'tipoDocumento', i) === 'valido') {
            formValido[2].bol = true;
          }

          // Parentesco
          let parentesco: any = document.getElementById('parentesco' + i);
          parentesco = parentesco.value;

          // Validaciones de parentesco
          if (this.validacionesRequire(parentesco, 'parentesco', i) === 'valido') {
            formValido[3].bol = true;
          }

          // número de documento
          let numeroDocumento: any = document.getElementById('numeroDocumento' + i);
          numeroDocumento = numeroDocumento.value;

          // validaciones numero de documento
          if (this.validacionNumeros(numeroDocumento, 'numeroDocumento', i) === 'numero_valido') {
            formValido[4].bol = true;
          }

          // Fecha de nacimiento
          let fechaNacimiento: any = document.getElementById('fechaNacimiento' + i);
          fechaNacimiento = fechaNacimiento.value;

          // Validaciones fecha de nacimiento
          if (this.validacionesRequire(fechaNacimiento, 'fechaNacimiento', i) === 'valido') {
            formValido[5].bol = true;
          }

          // Numero de celular
          let numeroCelular: any = document.getElementById('numeroCelular' + i);
          numeroCelular = numeroCelular.value;

          // validaciones numero de celular
          if (this.validacionNumeros(numeroCelular, 'numeroCelular', i) === 'numero_valido') {
            formValido[6].bol = true;
          }

          let bol = false;
          if ( formValido[0].bol === false ||
               formValido[1].bol === false ||
               formValido[2].bol === false ||
               formValido[3].bol === false ||
               formValido[4].bol === false ||
               formValido[5].bol === false ||
               formValido[6].bol === false
             ) {
               bol = false;
               return 'invalido';
          } else {
            bol = true;
          }

          // console.log(nombre, apellido, tipoDocumento, parentesco, numeroDocumento, fechaNacimiento, numeroCelular);
          this.infoBeneficiarios.push({nombre,
                                      apellido,
                                      tipoDocumento,
                                      parentesco,
                                      numeroDocumento,
                                      fechaNacimiento,
                                      numeroCelular,
                                      bol});
        }

    // console.log(this.infoBeneficiarios);
    return 'valido';

    // console.log(bol);

    // if (bol === true) {
    //   return 'valido';
    // } else {
    //   return 'invalido';
    // }

  }

}

validacionCadenaDeTexto(texto: string,
                        tipo: string,
                        posicion): string {
  // console.log(texto, tipo, posicion);

  var caracteresInvalidos = '0123456789*/-_!|()#.,<>°+';

  if (tipo === 'apellido')  {

    if (texto) {
      for (let j = 0; j < texto.length; j++) {
        if (caracteresInvalidos.indexOf(texto.charAt(j), 0) != -1) {
           document.getElementById('apellidos' + posicion).className = 'form-control is-invalid';
           document.getElementById('textap' + posicion).style.display = '';
           return 'caracteres_invalidos';
        } else {
          document.getElementById('apellidos' + posicion).className = 'form-control';
          document.getElementById('textap' + posicion).style.display = 'none';
          document.getElementById('apellidos' + posicion).className = 'form-control';
          document.getElementById('texta' + posicion).style.display = 'none';
          return 'caracteres_validos';
        }
       }

    } else {
          document.getElementById('apellidos' + posicion).className = 'form-control is-invalid';
          document.getElementById('texta' + posicion).style.display = '';
    }



  } else {

    if (texto) {
      for (let j = 0; j < texto.length; j++) {
        if (caracteresInvalidos.indexOf(texto.charAt(j), 0) != -1) {
           document.getElementById('nombres' + posicion).className = 'form-control is-invalid';
           document.getElementById('textno' + posicion).style.display = '';
           return 'caracteres_invalidos';
        } else {
          document.getElementById('nombres' + posicion).className = 'form-control';
          document.getElementById('textno' + posicion).style.display = 'none';
          document.getElementById('nombres' + posicion).className = 'form-control';
          document.getElementById('textn' + posicion).style.display = 'none';
          return 'caracteres_validos';
        }
       }
    } else {
         document.getElementById('nombres' + posicion).className = 'form-control is-invalid';
         document.getElementById('textn' + posicion).style.display = '';
    }
  }


}

validacionNumeros(numero: string,
                  tipo: string,
                  posicion: number): string {
  if (tipo === 'numeroDocumento')  {

    if (numero) {
      if ( numero.length < 5 || numero.length > 12 ) {
        // console.log('aqui');
        document.getElementById('numeroDocumento' + posicion).className = 'form-control is-invalid';
        document.getElementById('textndo' + posicion).style.display = '';
        return 'numero_invalido';
      }
      document.getElementById('numeroDocumento' + posicion).className = 'form-control';
      document.getElementById('textndo' + posicion).style.display = 'none';
      document.getElementById('numeroDocumento' + posicion).className = 'form-control';
      document.getElementById('textnd' + posicion).style.display = 'none';
      return 'numero_valido';
    } else {
      document.getElementById('numeroDocumento' + posicion).className = 'form-control is-invalid';
      document.getElementById('textnd' + posicion).style.display = '';
    }

  } else {

    if (numero) {

      if ( numero.length < 7 || numero.length > 15 ) {

        document.getElementById('numeroCelular' + posicion).className = 'form-control is-invalid';
        document.getElementById('textnce' + posicion).style.display = '';
        return 'numero_invalido';
      }

      document.getElementById('numeroCelular' + posicion).className = 'form-control';
      document.getElementById('textnce' + posicion).style.display = 'none';
      document.getElementById('numeroCelular' + posicion).className = 'form-control';
      document.getElementById('textnc' + posicion).style.display = 'none';
      return 'numero_valido';

    } else {
      document.getElementById('numeroCelular' + posicion).className = 'form-control is-invalid';
      document.getElementById('textnc' + posicion).style.display = '';
    }
  }

}

eliminarFormulario(index) {
    this.formsBeneficiario.splice(index, 1);
}

cambioHtml(ev, tipo, posicion) {
    // console.log(tipo);
    var value: any = document.getElementById(ev.target.id);
    value = value.value;

    switch (tipo) {

     case 'nombre' :
     this.validacionCadenaDeTexto(value, tipo, posicion);
     break;

     case 'apellido' :
     this.validacionCadenaDeTexto(value, tipo, posicion);
     break;

     case 'tipoDocumento' :
     this.validacionesRequire(value, tipo, posicion);
     break;

     case 'parentesco' :
     this.validacionesRequire(value, tipo, posicion);
     break;

     case 'fechaNacimiento' :
     this.validacionesRequire(value, tipo, posicion);
     break;

     case 'numeroCelular' :
     this.validacionNumeros(value, tipo, posicion);
     break;

     case 'numeroDocumento' :
     this.validacionNumeros(value, tipo, posicion);
     break;
    }
}

validacionesRequire(value,
                    tipo: string,
                    posicion: number): string {

  switch (tipo) {

    case 'tipoDocumento' :

    if (value) {
      document.getElementById('tipoDocumento' + posicion).className = 'form-control';
      document.getElementById('texttdo' + posicion).style.display = 'none';
      return 'valido';
    } else {
      document.getElementById('tipoDocumento' + posicion).className = 'form-control is-invalid';
      document.getElementById('texttdo' + posicion).style.display = '';
      return 'invalido';
    }
    break;

    case 'parentesco' :

    if (value) {
      document.getElementById('parentesco' + posicion).className = 'form-control';
      document.getElementById('textpa' + posicion).style.display = 'none';
      return 'valido';
    } else {
      document.getElementById('parentesco' + posicion).className = 'form-control is-invalid';
      document.getElementById('textpa' + posicion).style.display = '';
      return 'invalido';
    }
    break;

    case 'fechaNacimiento' :

    if (value) {
      document.getElementById('fechaNacimiento' + posicion).className = 'form-control';
      document.getElementById('textfn' + posicion).style.display = 'none';
      return 'valido';
    } else {
      document.getElementById('fechaNacimiento' + posicion).className = 'form-control is-invalid';
      document.getElementById('textfn' + posicion).style.display = '';
      return 'invalido';
    }
    break;
  }
}

cerrarAlerta() {
  this.statusText = '';
  this.status = '';
}

}
