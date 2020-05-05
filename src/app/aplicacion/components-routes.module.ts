import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginaComponent } from './pagina.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: PaginaComponent,
    children: [
      {path: 'footer', component: FooterComponent, data: {titulo : 'Dashboard'}},
      {path: 'home', component: HomeComponent, data: {titulo : 'Home'}},
      {path: 'usuarios', component: UsuariosComponent, data: {titulo : 'Home'}},
      {path: '**', component: HomeComponent, data: {titulo : 'Home'}},
      {path: '', redirectTo: '/home', pathMatch: 'full'},
     ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutesModule { }
