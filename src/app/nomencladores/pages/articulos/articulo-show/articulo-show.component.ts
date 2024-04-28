import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Articulo } from 'src/app/nomencladores/interfaces/articulo.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-articulo-show',
  templateUrl: './articulo-show.component.html',
  styleUrls: ['./articulo-show.component.css']
})
export class ArticuloShowComponent {
  articulo!: Articulo;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService,
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getArticulo( id ))
      )
      .subscribe((articulo) => {
        this.articulo = articulo;
        this.loading = false;
        console.log(  this.articulo );
      });
  }
}
