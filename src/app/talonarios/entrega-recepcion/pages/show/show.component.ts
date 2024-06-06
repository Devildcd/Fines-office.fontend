import { Component } from '@angular/core';
import { EntregaRecepcion } from '../../interfaces/entrega-recepcion.interface';
import { EntregaRecepcionService } from '../../services/entrega-recepcion.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  standalone: false,
  //imports: [],
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css'],
})
export class ShowComponent {

  entregas_recepcion!: EntregaRecepcion;
  loading = true;

  constructor(
    private entregarecepcionService: EntregaRecepcionService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.entregarecepcionService.getEntrega_Recepcion_Imposicion(id)))
      .subscribe((entregas_recepcion) => {
        this.entregas_recepcion = entregas_recepcion;
        this.loading = false;
        console.log(this.entregas_recepcion);
      });
  }

}
