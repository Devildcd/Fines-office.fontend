import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoAjuste } from 'src/app/nomencladores/interfaces/concepto-ajuste.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-concepto-ajuste-show',
  templateUrl: './concepto-ajuste-show.component.html',
  styleUrls: ['./concepto-ajuste-show.component.css']
})
export class ConceptoAjusteShowComponent {

  conceptoAjuste!: ConceptoAjuste;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConceptoAjuste( id ))
      )
      .subscribe((conceptoAjuste) => {
        this.conceptoAjuste = conceptoAjuste;
        this.loading = false;
        console.log(  this.conceptoAjuste );    
      });
  }
}
