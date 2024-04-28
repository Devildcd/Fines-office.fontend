import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-moneda-show',
  templateUrl: './moneda-show.component.html',
  styleUrls: ['./moneda-show.component.css']
})
export class MonedaShowComponent {

  moneda!: Moneda;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getMoneda( id ))
      )
      .subscribe((moneda) => {
        this.moneda = moneda;
        this.loading = false;
        console.log(  this.moneda );    
      });
  }
}
