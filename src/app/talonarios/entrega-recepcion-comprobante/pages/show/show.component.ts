import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EntregaRecepcionComprobanteService } from '../../services/entrega-recepcion-cmprobante.service';
import { EntregaRecepcionComprobante } from '../../interfaces/entrega-recepcion-comprobante.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  entregas_recepcion_comprobante!: EntregaRecepcionComprobante;
  loading = true;

  constructor(
    private entregarecepcioncomprobanteService: EntregaRecepcionComprobanteService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.entregarecepcioncomprobanteService.getEntrega_Recepcion_Comprobante(id)))
      .subscribe((entregas_recepcion_comprobante) => {
        this.entregas_recepcion_comprobante = entregas_recepcion_comprobante;
        this.loading = false;
        //console.log(this.entregas_recepcion_comprobante);
      });
  }

}
