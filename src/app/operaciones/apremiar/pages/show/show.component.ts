import { Component } from '@angular/core';
import { Apremiar } from 'src/app/operaciones/interfaces/apremiar.interface';
import { ApremiarService } from '../../services/apremiar.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  apremiar!: Apremiar;
  loading = true;

  constructor(
    private apremiarService: ApremiarService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.apremiarService.getApremiar(id)))
      .subscribe((apremiar) => {
        this.apremiar = apremiar;
        this.loading = false;
        console.log(this.apremiar);
      });
  }
}
