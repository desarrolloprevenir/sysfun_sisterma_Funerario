import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from './menu-lateral/menu-lateral.component';
import { TopNavegationComponent } from './top-navegation/top-navegation.component';
import { FooterComponent } from './footer/footer.component';
import { PaginaComponent } from './pagina.component';

// rutas
import { PagesRoutesModule } from './components-routes.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

@NgModule({
  declarations: [
    MenuLateralComponent,
    TopNavegationComponent,
    FooterComponent,
    PaginaComponent,
    HomeComponent,
    NotFoundComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    PagesRoutesModule
  ], exports: [
    MenuLateralComponent,
    TopNavegationComponent,
    FooterComponent,
    PaginaComponent,
    HomeComponent,
    NotFoundComponent,
    UsuariosComponent
  ]
})
export class AplicacionModule { }
