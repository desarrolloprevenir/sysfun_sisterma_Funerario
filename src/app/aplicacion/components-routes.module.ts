import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './modulos/administracion/usuarios/usuarios.component';
import { CrearEditarComponent } from './modulos/administracion/usuarios/crear-editar.component';

import { CrearPlanComponent } from './roles/super-admin/crear-plan/crear-plan.component';
import { VerPlanesComponent } from './roles/super-admin/ver-planes/ver-planes.component';
import { LlenarPlanComponent } from './roles/usuarios/llenar-plan/llenar-plan.component';

// Guards
import { AuthorisationGuard } from '../services/guards/authorisation.guard';



const routes: Routes = [
      {path: 'footer', component: FooterComponent, data: {titulo : 'Dashboard'}},
      {path: 'home', component: HomeComponent, data: {titulo : 'Home'}},

      // usuarios
      {path: 'usuarios', component: UsuariosComponent, data: {titulo : 'Usuarios'}},
      {path: 'crear-usuario', component: CrearEditarComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Crear Usuario' , m: 1, sm: 0, p : 'crear'}},
      {path: 'editar-usuario/:idUsuario', component: CrearEditarComponent , canActivate : [AuthorisationGuard],
              data: {titulo : 'Editar Usuario' , m: 1, sm: 0, p : 'editar'}},

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
