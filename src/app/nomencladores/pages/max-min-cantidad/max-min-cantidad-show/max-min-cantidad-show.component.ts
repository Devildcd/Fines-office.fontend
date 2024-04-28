import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaxMinCantidad } from 'src/app/nomencladores/interfaces/max-min-cantidad.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-max-min-cantidad-show',
  templateUrl: './max-min-cantidad-show.component.html',
  styleUrls: ['./max-min-cantidad-show.component.css']
})
export class MaxMinCantidadShowComponent {

  rangoCantidad!: MaxMinCantidad;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getRangoCantidad( id ))
      )
      .subscribe((rangoCantidad) => {
        this.rangoCantidad = rangoCantidad;
        this.loading = false;
        console.log( rangoCantidad );
      });
  }
}
