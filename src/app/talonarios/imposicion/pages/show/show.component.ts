import { Component } from '@angular/core';
import { Imposicion } from '../../interfaces/imposicion.interface';
import { ImposicionService } from '../../services/imposicion.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  imposicions!: Imposicion;
  loading = true;

  constructor(
    private imposicionService: ImposicionService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.imposicionService.getImposicion(id)))
      .subscribe((imposicions) => {
        this.imposicions = imposicions;
        this.loading = false;
        //console.log(this.imposicions);
      });
  }

}
