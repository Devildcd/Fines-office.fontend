import { Component } from '@angular/core';
import { Matriz } from '../../interfaces/matriz.interface';
import { MatrizService } from '../../services/matriz.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  matriz!: Matriz;
  loading = true;

  constructor(
    private matrizService: MatrizService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.matrizService.getMatriz(id)))
      .subscribe((matriz) => {
        this.matriz = matriz;
        this.loading = false;
        console.log(this.matriz);
      });
  }
}
