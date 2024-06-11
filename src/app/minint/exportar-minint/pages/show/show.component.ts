import { Component } from '@angular/core';
import { ExportarMinint } from '../../interfaces/exportar-minint.interface';
import { ExpMinintService } from '../../services/exp-minint.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  expMinint!: ExportarMinint;
  loading = true;

  constructor(
    private exportMinintService: ExpMinintService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.exportMinintService.getExportarMinint(id)))
      .subscribe((expMinint) => {
        this.expMinint = expMinint;
        this.loading = false;
        console.log(this.expMinint);
      });
  }
}
