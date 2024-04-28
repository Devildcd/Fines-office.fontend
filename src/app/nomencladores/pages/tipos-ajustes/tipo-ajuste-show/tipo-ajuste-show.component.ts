import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoAjuste } from 'src/app/nomencladores/interfaces/tipo-ajuste.inteface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-tipo-ajuste-show',
  templateUrl: './tipo-ajuste-show.component.html',
  styleUrls: ['./tipo-ajuste-show.component.css']
})
export class TipoAjusteShowComponent {

  tipoAjuste!: TipoAjuste;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getTipoAjuste( id ))
      )
      .subscribe((tipoAjuste) => {
        this.tipoAjuste = tipoAjuste;
        this.loading = false;
        console.log( tipoAjuste );
      });
  }
}
