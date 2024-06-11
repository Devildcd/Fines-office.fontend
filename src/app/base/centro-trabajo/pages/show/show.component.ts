import { Component } from '@angular/core';
import { CentroTrabajo } from '../../interfaces/centroTrabajo.interface';
import { CentroTrabajoService } from '../../services/centro-trabajo.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  centroTrabajo!: CentroTrabajo;
  loading = true;

  constructor(
    private centroTrabajoService: CentroTrabajoService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.centroTrabajoService.getCentroTrabajo(id)))
      .subscribe((centroTrabajo) => {
        this.centroTrabajo = centroTrabajo;
        this.loading = false;
        console.log(this.centroTrabajo);
      });
  }
}
