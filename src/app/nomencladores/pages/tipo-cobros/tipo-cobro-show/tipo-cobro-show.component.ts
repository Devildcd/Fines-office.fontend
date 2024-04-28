import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoCobro } from 'src/app/nomencladores/interfaces/tipo-cobro.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-tipo-cobro-show',
  templateUrl: './tipo-cobro-show.component.html',
  styleUrls: ['./tipo-cobro-show.component.css']
})
export class TipoCobroShowComponent {

  tipoCobro!: TipoCobro;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getTipoCobro( id ))
      )
      .subscribe((tipoCobro) => {
        this.tipoCobro = tipoCobro;
        this.loading = false;
        console.log(  this.tipoCobro );    
      });
  }
}
