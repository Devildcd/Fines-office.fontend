import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { MedioCobro } from 'src/app/nomencladores/interfaces/medio-cobro.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-medio-cobro-show',
  templateUrl: './medio-cobro-show.component.html',
  styleUrls: ['./medio-cobro-show.component.css']
})
export class MedioCobroShowComponent {
  medioCobro!: MedioCobro;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService,
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {
    
    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getMedioCobro( id ))
      )
      .subscribe((medioCobro) => {
        this.medioCobro = medioCobro;
        this.loading = false;
        console.log(  this.medioCobro );
      });
  }
}
