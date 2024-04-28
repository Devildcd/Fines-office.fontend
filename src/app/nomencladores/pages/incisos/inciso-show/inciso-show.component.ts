import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Inciso } from 'src/app/nomencladores/interfaces/inciso.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-inciso-show',
  templateUrl: './inciso-show.component.html',
  styleUrls: ['./inciso-show.component.css']
})
export class IncisoShowComponent {
  inciso!: Inciso;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService,
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getInciso( id ))
      )
      .subscribe((inciso) => {
        this.inciso = inciso;
        this.loading = false;
        console.log(  this.inciso );
      });
  }
}
