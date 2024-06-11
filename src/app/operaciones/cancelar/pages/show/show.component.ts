import { Component } from '@angular/core';
import { Cancelar } from 'src/app/operaciones/interfaces/cancelar.interfaces';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CancelarService } from '../../services/cancelar.service';
@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  cancelar!: Cancelar;
  loading = true;

  constructor(
    private cancelarService: CancelarService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.cancelarService.getCancelar(id)))
      .subscribe((cancelar) => {
        this.cancelar = cancelar;
        this.loading = false;
        console.log(this.cancelar);
      });
  }
}
