import { Component } from '@angular/core';
import { Duplicar } from 'src/app/operaciones/interfaces/duplicar.interface';
import { DuplicarService } from '../../services/duplicar.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  duplicar!: Duplicar;
  loading = true;

  constructor(
    private duplicarService: DuplicarService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.duplicarService.getDuplicacion(id)))
      .subscribe((duplicar) => {
        this.duplicar = duplicar;
        this.loading = false;
        console.log(this.duplicar);
      });
  }
}
