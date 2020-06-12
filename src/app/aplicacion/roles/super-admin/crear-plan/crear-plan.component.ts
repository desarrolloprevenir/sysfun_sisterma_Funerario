import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Plan } from '../../../../models/plan.model';
import { UsuarioService } from '../../../../services/usuario/usuario.service';
import { Usuario } from '../../../../models/usuario.model';
import { SuperAdminService } from '../../../../services/super-admin/super-admin.service';

@Component({
  selector: 'app-crear-plan',
  templateUrl: './crear-plan.component.html',
  styles: []
})
export class CrearPlanComponent implements OnInit {

  constructor(public usuarioService: UsuarioService,
              public superAdminServce: SuperAdminService) { }

  ngOnInit() {
  }

  guardarPlan(formulario: NgForm) {
    // console.log(formulario.value.nombrePlan);
    // let plan = new Plan (formulario.value.nombrePlan, formulario.value.valorAnual, formulario.value.numeroPersonas,
    //                       formulario.value.numeroCuotas, this.usuarioService.usuario.nit);


    // let plan = { nombre: formulario.value.nombrePlan, valor: formulario.value.valorAnual, max_personas: formulario.value.numeroPersonas,
    //              valorPersona: formulario.value.valorPersona, cuotas: formulario.value.numeroCuotas,
    //              nit: this.usuarioService.cargarInfoToken().usuario.provedores_nit, formaPago: formulario.value.formaPago,
    //             carencias: formulario.value.carencias, descripcion: formulario.value.descripcion};
    // console.log(plan);

    // this.superAdminServce.crearPlan(plan).subscribe();
  }

}
