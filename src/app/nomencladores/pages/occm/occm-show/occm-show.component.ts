import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { OCCM } from 'src/app/nomencladores/interfaces/occm.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-occm-show',
  templateUrl: './occm-show.component.html',
  styleUrls: ['./occm-show.component.css']
})
export class OccmShowComponent {

  occm!: OCCM;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.nomencladoresService.getOCCM(id)))
      .subscribe((occm) => {
        this.occm = occm;
        this.loading = false;
        console.log(this.occm);
      });
  }
}
