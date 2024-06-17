import { Component } from '@angular/core';
import { Devolucion } from 'src/app/operaciones/interfaces/devolucion.interface';
import { DevolucionService } from '../../services/devolucion.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  devolucion!: Devolucion;
  loading = true;

  constructor(
    private devolucionService: DevolucionService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.devolucionService.getDevolucion(id)))
      .subscribe((devolucion) => {
        this.devolucion = devolucion;
        this.loading = false;
        console.log(this.devolucion);
      });
  }
}
