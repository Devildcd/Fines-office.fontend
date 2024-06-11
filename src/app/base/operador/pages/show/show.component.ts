import { Component } from '@angular/core';
import { Operador } from '../../interfaces/operador.interface';
import { OperadorService } from '../../services/operador.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  operador!: Operador;
  loading = true;

  constructor(
    private operadorService: OperadorService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.operadorService.getOperador(id)))
      .subscribe((operador) => {
        this.operador = operador;
        this.loading = false;
        console.log(this.operador);
      });
  }
}
