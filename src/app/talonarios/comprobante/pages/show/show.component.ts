import { Component } from '@angular/core';
import { Comprobante } from '../../interfaces/comprobante.interface';
import { ComprobanteService } from '../../services/comprobante.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  comprobantes!: Comprobante;
  loading = true;

  constructor(
    private comprobanteService: ComprobanteService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.comprobanteService.getComprobante(id)))
      .subscribe((comprobantes) => {
        this.comprobantes = comprobantes;
        this.loading = false;
        //console.log(this.imposicions);
      });
  }

}
