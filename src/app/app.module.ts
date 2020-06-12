import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Modulos

// Modulo aplicacion
import { AplicacionModule } from './aplicacion/aplicacion.module';

// Registro y login
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { PaginaComponent } from './aplicacion/pagina.component';

// Servicios modulo
import { ServicesModule } from './services/services.module';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    PaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AplicacionModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
