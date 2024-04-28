import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoAnulacion } from 'src/app/nomencladores/interfaces/concepto-anulacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-concepto-anulacion-show',
  templateUrl: './concepto-anulacion-show.component.html',
  styleUrls: ['./concepto-anulacion-show.component.css']
})
export class ConceptoAnulacionShowComponent {

  conceptoAnulacion!: ConceptoAnulacion;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConceptoAnulacion( id ))
      )
      .subscribe((conceptoAnulacion) => {
        this.conceptoAnulacion = conceptoAnulacion;
        this.loading = false;
        console.log(  this.conceptoAnulacion );    
      });
  }
}
