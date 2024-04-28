import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoCancelacion } from 'src/app/nomencladores/interfaces/concepto-cancelacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-concepto-cancelacion-show',
  templateUrl: './concepto-cancelacion-show.component.html',
  styleUrls: ['./concepto-cancelacion-show.component.css']
})
export class ConceptoCancelacionShowComponent {

  conceptoCancelacion!: ConceptoCancelacion;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConceptoCancelacion( id ))
      )
      .subscribe((conceptoCancelacion) => {
        this.conceptoCancelacion = conceptoCancelacion;
        this.loading = false;
        console.log(  this.conceptoCancelacion );    
      });
  }
}
