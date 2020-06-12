import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styles: []
})
export class TituloComponent implements OnInit {
  public titulo: string;

  constructor( private router: Router,
               private title: Title,
               private meta: Meta ) {

    this.getDataRoute().subscribe( (data: any) => {
      // console.log(data);
      this.titulo = data.titulo;
      this.title.setTitle( this.titulo );
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
    .pipe(
      filter ( ev => ev instanceof ActivationEnd ),
      filter ( (ev: ActivationEnd) => ev.snapshot.firstChild === null  ),
      map ( (evento: ActivationEnd) => evento.snapshot.data )
      );
  }

}
