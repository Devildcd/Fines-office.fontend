import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoDocumento } from 'src/app/nomencladores/interfaces/tipo-documento.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-tipo-documento-show',
  templateUrl: './tipo-documento-show.component.html',
  styleUrls: ['./tipo-documento-show.component.css'],
})
export class TipoDocumentoShowComponent {
  
  tipoDocumento!: TipoDocumento;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.nomencladoresService.getTipoDocumento(id)))
      .subscribe((tipoDocumento) => {
        this.tipoDocumento = tipoDocumento;
        this.loading = false;
        console.log(tipoDocumento);
      });
  }
}
