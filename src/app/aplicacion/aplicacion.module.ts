import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { TopNavegationComponent } from './top-navegation/top-navegation.component';
import { FooterComponent } from './footer/footer.component';

// rutas
import { PagesRoutesModule } from './components-routes.module';

// Servicions
import { ServicesModule } from '../services/services.module';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Pipes
import { PipeModule } from '../pipes/pipe.module';

// components
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsuariosComponent } from './modulos/administracion/usuarios/usuarios.component';
import { CrearPlanComponent } from './roles/super-admin/crear-plan/crear-plan.component';
import { VerPlanesComponent } from './roles/super-admin/ver-planes/ver-planes.component';
import { TituloComponent } from './titulo/titulo.component';
import { LlenarPlanComponent } from './roles/usuarios/llenar-plan/llenar-plan.component';
import { CrearUsuarioComponent } from './modulos/administracion/usuarios/crear-usuario.component';


@NgModule({
  declarations: [
    MenuLateralComponent,
    TopNavegationComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    UsuariosComponent,
    CrearPlanComponent,
    VerPlanesComponent,
    TituloComponent,
    LlenarPlanComponent,
    CrearUsuarioComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutesModule,
    ServicesModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule
  ], exports: [
    MenuLateralComponent,
    TopNavegationComponent,
    FooterComponent,
    HomeComponent,
    NotFoundComponent,
    TituloComponent
  ]
})
export class AplicacionModule { }
