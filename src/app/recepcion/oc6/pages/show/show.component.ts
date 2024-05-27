import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Oc6 } from '../../interfaces/oc6.interface';
import { Oc6Service } from '../../services/oc6.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  modeloOc6!: Oc6;
  loading = true;

  constructor(
    private oc6Service: Oc6Service,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.oc6Service.getModeloOc6(id)))
      .subscribe((modeloOc6) => {
        this.modeloOc6 = modeloOc6;
        this.loading = false;
        console.log(this.modeloOc6);
      });
  }
}
