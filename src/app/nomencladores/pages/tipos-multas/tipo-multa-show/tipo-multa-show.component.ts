import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-tipo-multa-show',
  templateUrl: './tipo-multa-show.component.html',
  styleUrls: ['./tipo-multa-show.component.css']
})
export class TipoMultaShowComponent {

  tipoMulta!: TipoMulta;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getTipoMulta( id ))
      )
      .subscribe((tipoMulta) => {
        this.tipoMulta = tipoMulta;
        this.loading = false;
        console.log( tipoMulta );
      });
  }
}
