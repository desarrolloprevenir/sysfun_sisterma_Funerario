import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cambioPalabras'
})
export class CambioPalabrasPipe implements PipeTransform {

  transform(value: string): string {

    if (value === 'Admin') {
      return 'Administrador';
    }
    return 'Usuario';
  }

}
