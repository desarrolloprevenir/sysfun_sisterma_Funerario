import { NgModule } from '@angular/core';

// Servicios
import { ValidacionesFormService } from './validaciones/validaciones-form.service';
import { EncriptarService } from './validaciones/encriptar.service';
import { UsuarioService } from './usuario/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { SuperAdminService } from './super-admin/super-admin.service';

// GUARDS
import { LoginGuard } from './guards/login.guard';



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

    // GUARDS
    LoginGuard
    ]
})
export class ServicesModule { }
