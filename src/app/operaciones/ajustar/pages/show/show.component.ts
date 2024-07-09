import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ajustar } from 'src/app/operaciones/interfaces/ajustar.interface';
import { AjustarService } from '../../services/ajustar.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  ajustar!: Ajustar;
  loading = true;

  constructor(
    private ajustarService: AjustarService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.ajustarService.getAjustar(id)))
      .subscribe((ajustar) => {
        this.ajustar = ajustar;
        this.loading = false;
        console.log(this.ajustar);
      });
  }
}
