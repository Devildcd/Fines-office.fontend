import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SituacionMulta } from 'src/app/nomencladores/interfaces/situacion-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-situacion-multa-show',
  templateUrl: './situacion-multa-show.component.html',
  styleUrls: ['./situacion-multa-show.component.css']
})
export class SituacionMultaShowComponent {

  sitMulta!: SituacionMulta;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getSituacionMulta( id ))
      )
      .subscribe((sitMulta) => {
        this.sitMulta = sitMulta;
        this.loading = false;
        console.log( sitMulta );
      });
  }
}
