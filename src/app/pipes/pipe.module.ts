import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CambioPalabrasPipe } from './aplicacion/cambio-palabras.pipe';



@NgModule({
  declarations: [CambioPalabrasPipe],
  imports: [
    CommonModule
  ],
  exports: [CambioPalabrasPipe]
})
export class PipeModule { }
