import { Component } from '@angular/core';
import { SubMovMulta } from '../../interfaces/sub-mov-multa.interface';
import { SubMovMultaService } from '../../services/sub-mov-multa.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  subMovMulta!: SubMovMulta;
  loading = true;

  constructor(
    private subMovMultaService: SubMovMultaService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.subMovMultaService.getSubMovMulta(id)))
      .subscribe((subMovMulta) => {
        this.subMovMulta = subMovMulta;
        this.loading = false;
        console.log(this.subMovMulta);
      });
  }
}
