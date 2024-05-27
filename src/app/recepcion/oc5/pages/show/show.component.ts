import { Component } from '@angular/core';
import { OC5 } from '../../interfaces/oc5.interface';
import { Oc5Service } from '../../services/oc5.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  modeloOc5!: OC5;
  loading = true;

  constructor(
    private oc5Service: Oc5Service,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.oc5Service.getModeloOc5(id)))
      .subscribe((modeloOc5) => {
        this.modeloOc5 = modeloOc5;
        this.loading = false;
        console.log(this.modeloOc5);
      });
  }
}
