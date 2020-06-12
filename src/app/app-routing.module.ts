import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { RegistroComponent } from './login/registro/registro.component';
import { NotFoundComponent } from './aplicacion/not-found/not-found.component';
import { PaginaComponent } from './aplicacion/pagina.component';
import { LoginGuard } from './services/guards/login.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '', component: PaginaComponent, canActivate: [LoginGuard], loadChildren: './aplicacion/aplicacion.module#AplicacionModule' },
    // {path: '', component: PaginaComponent, loadChildren: './aplicacion/aplicacion.module#AplicacionModule' },
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
