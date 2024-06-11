import { Component } from '@angular/core';
import { ConfiguracionApi } from '../../interfaces/configuracion-api.interface';
import { ConfApiService } from '../../services/conf-api.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  confApi!: ConfiguracionApi;
  loading = true;

  constructor(
    private confApiService: ConfApiService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.confApiService.getConfiguracionApi(id)))
      .subscribe((confApi) => {
        this.confApi = confApi;
        this.loading = false;
        console.log(this.confApi);
      });
  }
}
