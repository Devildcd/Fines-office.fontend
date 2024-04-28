import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Provincia } from 'src/app/nomencladores/interfaces/provincia.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-provincia-show',
  templateUrl: './provincia-show.component.html',
  styleUrls: ['./provincia-show.component.css']
})
export class ProvinciaShowComponent {

  provincia!: Provincia;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getProvincia( id ))
      )
      .subscribe((provincia) => {
        this.provincia = provincia;
        this.loading = false;
        console.log( provincia );
      });
  }

}
