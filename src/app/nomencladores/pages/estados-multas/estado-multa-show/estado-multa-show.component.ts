import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { EstadoMulta } from 'src/app/nomencladores/interfaces/estado-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-estado-multa-show',
  templateUrl: './estado-multa-show.component.html',
  styleUrls: ['./estado-multa-show.component.css']
})
export class EstadoMultaShowComponent {

  estadoMulta!: EstadoMulta;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getEstadoMulta( id ))
      )
      .subscribe((estadoMulta) => {
        this.estadoMulta = estadoMulta;
        this.loading = false;
        console.log(  this.estadoMulta );    
      });
  }
}
