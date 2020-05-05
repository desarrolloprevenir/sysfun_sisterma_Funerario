import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos

// Modulo aplicacion
import { AplicacionModule } from './aplicacion/aplicacion.module';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AplicacionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
