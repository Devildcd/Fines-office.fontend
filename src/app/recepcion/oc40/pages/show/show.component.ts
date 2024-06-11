import { Component } from '@angular/core';
import { Oc40 } from '../../interfaces/oc40.interface';
import { Oc40Service } from '../../services/oc40.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  modeloOc40!: Oc40;
  loading = true;

  constructor(
    private oc40Service: Oc40Service,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.oc40Service.getModeloOc40(id)))
      .subscribe((modeloOc40) => {
        this.modeloOc40 = modeloOc40;
        this.loading = false;
        console.log(this.modeloOc40);
      });
  }
}
