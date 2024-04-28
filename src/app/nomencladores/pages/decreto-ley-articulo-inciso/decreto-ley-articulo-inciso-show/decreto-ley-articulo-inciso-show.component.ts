import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DecretoLeyArticuloInciso } from 'src/app/nomencladores/interfaces/decreto-ley-articulo-inciso.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-decreto-ley-articulo-inciso-show',
  templateUrl: './decreto-ley-articulo-inciso-show.component.html',
  styleUrls: ['./decreto-ley-articulo-inciso-show.component.css']
})
export class DecretoLeyArticuloIncisoShowComponent {

  decLeyArtInc!: DecretoLeyArticuloInciso;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.nomencladoresService.getDecLeyArticuloInciso(id)))
      .subscribe((decLeyArtInc) => {
        this.decLeyArtInc = decLeyArtInc;
        this.loading = false;
        console.log(this.decLeyArtInc);
      });
  }
}
