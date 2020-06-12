import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Plan } from '../../models/plan.model';
import { UsuarioService } from '../usuario/usuario.service';

const apiUrl = environment.ApiUrl;

@Injectable({
  providedIn: 'root'
})
export class SuperAdminService {

  token: string;

  constructor(public http: HttpClient,
              public usuarioService: UsuarioService) {
                this.cargarToken();
               }

    // ======================================
    // Cargar token
    // ======================================
    cargarToken() {
      this.token = localStorage.getItem('token');
    }

    // ======================================
    // Crear plan prexequial
    // ======================================

    crearPlan(plan: Plan) {

      return this.http.post(apiUrl + 'planf' + '?token=' + this.token , plan);
    }
}
