import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaxMinimporte } from 'src/app/nomencladores/interfaces/max-min-importe.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-max-min-importe-show',
  templateUrl: './max-min-importe-show.component.html',
  styleUrls: ['./max-min-importe-show.component.css']
})
export class MaxMinImporteShowComponent {

  rangoImporte!: MaxMinimporte;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getRangoImporte( id ))
      )
      .subscribe((rangoImporte) => {
        this.rangoImporte = rangoImporte;
        this.loading = false;
        console.log( rangoImporte );
      });
  }
}
