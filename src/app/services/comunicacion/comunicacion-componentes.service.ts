import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionComponentesService {
  public notificacion = new EventEmitter<any>();

  constructor() { }

  emitNavChangeEvent(res) {
    this.notificacion.emit(res);
    console.log(this.notificacion);
  }
  getNavChangeEmitter() {
    return this.notificacion;
  }

}
