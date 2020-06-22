import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

const apiUrl = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, idUsuario: string) {


    return new Promise( (resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('imagen', archivo, archivo.name);

      xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {

            if (xhr.status === 200) {
              //  console.log('imagen subida');
               resolve(JSON.parse( xhr.response ));
            } else {
              // console.log('fallo la subida');
              reject(JSON.parse( xhr.response ));
            }
          }
      };

      let url = apiUrl + '/uploads/' + idUsuario;
      xhr.open('PUT', url, true);
      xhr.send(formData);

    });
  }
}
