import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Calle } from 'src/app/nomencladores/interfaces/calles.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-calle-show',
  templateUrl: './calle-show.component.html',
  styleUrls: ['./calle-show.component.css']
})
export class CalleShowComponent {

  calle!: Calle;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getCalle( id ))
      )
      .subscribe((calle) => {
        this.calle = calle;
        this.loading = false;
        console.log( calle );
      });
  }
}
