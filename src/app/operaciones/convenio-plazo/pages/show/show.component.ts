import { Component } from '@angular/core';
import { ConvenioPlazo } from 'src/app/operaciones/interfaces/convenio-plazo.interface';
import { ConvenioPlazoService } from '../../service/convenio-plazo.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {
  convenioPlazo!: ConvenioPlazo;
  loading = true;

  constructor(
    private convenioPlazoService: ConvenioPlazoService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.convenioPlazoService.getConvenioPlazo(id)))
      .subscribe((convenioPlazo) => {
        this.convenioPlazo = convenioPlazo;
        this.loading = false;
        console.log(this.convenioPlazo);
      });
  }
}
