import { Component } from '@angular/core';
import { EnviarTraslado } from '../../interfaces/enviar-traslado.interface';
import { EnviarTrasladoService } from '../../services/enviar-traslado.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  enviarTraslado!: EnviarTraslado;
  loading = true;

  constructor(
    private enviarTrasladoService: EnviarTrasladoService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.enviarTrasladoService.getEnviarTraslado(id)))
      .subscribe((enviarTraslado) => {
        this.enviarTraslado = enviarTraslado;
        this.loading = false;
        console.log(this.enviarTraslado);
      });
  }
}
