import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Zona } from 'src/app/nomencladores/interfaces/zona.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-zona-show',
  templateUrl: './zona-show.component.html',
  styleUrls: ['./zona-show.component.css']
})
export class ZonaShowComponent {

  zona!: Zona;
  loading = true;

  constructor( 
    private nomencladoresService: NomencladoresService, 
    private activeRoute: ActivatedRoute ) {}

    ngOnInit() {

      this.activeRoute.params
        .pipe(
          switchMap(({ id }) => this.nomencladoresService.getZona( id ))
        )
        .subscribe((zona) => {
          this.zona = zona;
          this.loading = false;
          console.log( zona );
        });
    }
}
