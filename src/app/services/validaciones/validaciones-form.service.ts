import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidacionesFormService {

  constructor() { }

  lengthNumeros(numero: string,
                valor1: number,
                valor2: number): boolean {

      if ( numero.length >= valor1 && numero.length <= valor2 ) {
              // console.log('valido');
              return true;
           }

      return false;

  }
  
  }



