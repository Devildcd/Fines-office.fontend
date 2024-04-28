import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { SituacionLaboral } from 'src/app/nomencladores/interfaces/situacion-laboral.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-situacion-laboral-show',
  templateUrl: './situacion-laboral-show.component.html',
  styleUrls: ['./situacion-laboral-show.component.css']
})
export class SituacionLaboralShowComponent {
  situacionLaboral!: SituacionLaboral;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService,
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getSituacionLaboral( id ))
      )
      .subscribe((situacionLaboral) => {
        this.situacionLaboral = situacionLaboral;
        this.loading = false;
        console.log(  this.situacionLaboral );
      });
  }
}
