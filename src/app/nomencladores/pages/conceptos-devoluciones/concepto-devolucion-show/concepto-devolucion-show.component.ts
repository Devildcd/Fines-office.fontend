import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoDevolucion } from 'src/app/nomencladores/interfaces/concepto-devolucion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-concepto-devolucion-show',
  templateUrl: './concepto-devolucion-show.component.html',
  styleUrls: ['./concepto-devolucion-show.component.css']
})
export class ConceptoDevolucionShowComponent {

  conceptoDevolucion!: ConceptoDevolucion;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConceptoDevolucion( id ))
      )
      .subscribe((conceptoDevolucion) => {
        this.conceptoDevolucion = conceptoDevolucion;
        this.loading = false;
        console.log(  this.conceptoDevolucion );    
      });
  }
}
