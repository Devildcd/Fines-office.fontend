import { Component } from '@angular/core';
import { ComunicacionEmbargo } from 'src/app/operaciones/interfaces/comunicacion-embargo.interface';
import { ComunicacionEmbargoService } from '../../services/comunicacion-embargo.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  comunicacionEmbargo!: ComunicacionEmbargo;;
  loading = true;

  constructor(
    private comunicacionEmbargoService: ComunicacionEmbargoService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.comunicacionEmbargoService.getComunicacionEmbargo(id)))
      .subscribe((comunicacionEmbargo) => {
        this.comunicacionEmbargo = comunicacionEmbargo;
        this.loading = false;
        console.log(this.comunicacionEmbargo);
      });
  }
}
