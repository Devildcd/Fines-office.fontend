import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { DecretoLey } from 'src/app/nomencladores/interfaces/decreto-ley.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-decreto-ley-show',
  templateUrl: './decreto-ley-show.component.html',
  styleUrls: ['./decreto-ley-show.component.css'],
})
export class DecretoLeyShowComponent {
  
  decreto!: DecretoLey;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.nomencladoresService.getDecreto(id)))
      .subscribe((decreto) => {
        this.decreto = decreto;
        this.loading = false;
        console.log(this.decreto);
      });
  }
}
