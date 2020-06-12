import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './modulos/administracion/usuarios/ver-usuarios/usuarios.component';
import { CrearUsuarioComponent } from './modulos/administracion/usuarios/crear-usuario/crear-usuario.component';
import { CrearPlanComponent } from './roles/super-admin/crear-plan/crear-plan.component';
import { VerPlanesComponent } from './roles/super-admin/ver-planes/ver-planes.component';
import { LlenarPlanComponent } from './roles/usuarios/llenar-plan/llenar-plan.component';



const routes: Routes = [
      {path: 'footer', component: FooterComponent, data: {titulo : 'Dashboard'}},
      {path: 'home', component: HomeComponent, data: {titulo : 'Home'}},

      // usuarios
      {path: 'usuarios', component: UsuariosComponent, data: {titulo : 'Gestionar Usuarios'}},
      {path: 'crear-usuario', component: CrearUsuarioComponent, data: {titulo : 'Crear Usuario'}},

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
