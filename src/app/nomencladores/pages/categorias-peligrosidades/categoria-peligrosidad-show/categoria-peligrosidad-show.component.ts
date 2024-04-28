import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoriaPeligrosidad } from 'src/app/nomencladores/interfaces/categoria-peligrosidad.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-categoria-peligrosidad-show',
  templateUrl: './categoria-peligrosidad-show.component.html',
  styleUrls: ['./categoria-peligrosidad-show.component.css']
})
export class CategoriaPeligrosidadShowComponent {
  categoriaPeligrosidad!: CategoriaPeligrosidad;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService,
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getCategoriaPeligrosidad( id ))
      )
      .subscribe((categoriaPeligrosidad) => {
        this.categoriaPeligrosidad = categoriaPeligrosidad;
        this.loading = false;
        console.log(  this.categoriaPeligrosidad );
      });
  }
}
