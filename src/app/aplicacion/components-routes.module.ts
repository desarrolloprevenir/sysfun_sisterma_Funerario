import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthorisationGuard } from '../services/guards/authorisation.guard';

// Componentes
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './modulos/administracion/usuarios/usuarios.component';
import { CrearEditarComponent } from './modulos/administracion/usuarios/crear-editar.component';
import { CrearPlanComponent } from './roles/super-admin/crear-plan/crear-plan.component';
import { VerPlanesComponent } from './roles/super-admin/ver-planes/ver-planes.component';
import { LlenarPlanComponent } from './roles/usuarios/llenar-plan/llenar-plan.component';
import { PerfilComponent } from './modulos/perfil_y_organizacion/perfil/perfil.component';
import { ConveniosComponent } from './modulos/administracion/convenios/convenios.component';
import { CrearEditarConveniosComponent } from './modulos/administracion/convenios/crear-editar-convenios.component';



const routes: Routes = [
      {path: 'footer', component: FooterComponent, data: {titulo : 'Dashboard'}},
      {path: 'home', component: HomeComponent, data: {titulo : 'Home'}},

      // usuarios
      {path: 'usuarios', component: UsuariosComponent, data: {titulo : 'Usuarios'}},
      {path: 'crear-usuario', component: CrearEditarComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Crear Usuario' , m: 1, sm: 0, p : 'crear'}},
      {path: 'editar-usuario/:idUsuario', component: CrearEditarComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Editar Usuario' , m: 1, sm: 0, p : 'editar'}},

      // Convenios
      {path: 'convenios', component: ConveniosComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Convenios' , m: 1, sm: 1, p : 'ver'}},
      {path: 'crear-convenio', component: CrearEditarConveniosComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Crear Convenio' , m: 1, sm: 1, p : 'crear'}},

      // Perfil y Organización
      {path: 'perfil', component: PerfilComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Mi perfil' , m: 0, sm: 1, p : 'ver'}},

      // planes
      {path: 'crear-plan', component: CrearPlanComponent, data: {titulo : 'Crear plan'}},
      {path: 'ver-planes', component: VerPlanesComponent, data: {titulo : 'Ver planes'}},
      {path: 'registrar-contrato', component: LlenarPlanComponent, data: {titulo : 'Registrar contrato'}},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutesModule { }
