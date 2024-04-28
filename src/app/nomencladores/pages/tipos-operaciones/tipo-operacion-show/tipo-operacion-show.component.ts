import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoOperacion } from 'src/app/nomencladores/interfaces/tipo-operacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-tipo-operacion-show',
  templateUrl: './tipo-operacion-show.component.html',
  styleUrls: ['./tipo-operacion-show.component.css']
})
export class TipoOperacionShowComponent {

  tipoOperacion!: TipoOperacion;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.nomencladoresService.getTipoOperacion(id)))
      .subscribe((tipoOperacion) => {
        this.tipoOperacion = tipoOperacion;
        this.loading = false;
        console.log(tipoOperacion);
      });
  }
}
