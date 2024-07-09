import { Component } from '@angular/core';
import { Convenio } from 'src/app/operaciones/interfaces/convenio.interface';
import { ConvenioService } from '../../services/convenio.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  convenio!: Convenio;;
  loading = true;

  constructor(
    private convenioService: ConvenioService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.convenioService.getConvenio(id)))
      .subscribe((convenio) => {
        this.convenio = convenio;
        this.loading = false;
        console.log(this.convenio);
      });
  }
}
