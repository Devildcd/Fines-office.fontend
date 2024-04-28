import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoTraslado } from 'src/app/nomencladores/interfaces/concepto-traslado.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-concepto-traslado-show',
  templateUrl: './concepto-traslado-show.component.html',
  styleUrls: ['./concepto-traslado-show.component.css']
})
export class ConceptoTrasladoShowComponent {

  conceptoTraslado!: ConceptoTraslado;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConceptoTraslado( id ))
      )
      .subscribe((conceptoTraslado) => {
        this.conceptoTraslado = conceptoTraslado;
        this.loading = false;
        console.log(  this.conceptoTraslado );    
      });
  }
}
