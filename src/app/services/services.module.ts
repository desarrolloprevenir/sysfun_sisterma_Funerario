import { NgModule } from '@angular/core';

// GUARDS
import { LoginGuard } from './guards/login.guard';
import { AuthorisationGuard } from './guards/authorisation.guard';

// Servicios
import { ValidacionesFormService } from './validaciones/validaciones-form.service';
import { EncriptarService } from './validaciones/encriptar.service';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { SuperAdminService } from './super-admin/super-admin.service';
import { ComunicacionComponentesService } from './comunicacion/comunicacion-componentes.service';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule
  ],
  providers: [
    ValidacionesFormService,
    EncriptarService,
    UsuarioService,
    SuperAdminService,
    ComunicacionComponentesService,

    // GUARDS
    LoginGuard,
    AuthorisationGuard
    ]
})
export class ServicesModule { }
