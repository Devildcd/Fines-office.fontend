import { Component } from '@angular/core';
import { EntregaRecepcionImposicion } from '../../interfaces/entrega-recepcion-imposicion.interface';
import { EntregaRecepcionImposicionService } from '../../services/entrega-recepcion-imposicion.service';
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

  entregas_recepcion_imposicion!: EntregaRecepcionImposicion;
  loading = true;

  constructor(
    private entregarecepcionimposicionService: EntregaRecepcionImposicionService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.entregarecepcionimposicionService.getEntrega_Recepcion_Imposicion(id)))
      .subscribe((entregas_recepcion_imposicion) => {
        this.entregas_recepcion_imposicion = entregas_recepcion_imposicion;
        this.loading = false;
        //console.log(this.entregas_recepcion_imposicion);
      });
  }

}
