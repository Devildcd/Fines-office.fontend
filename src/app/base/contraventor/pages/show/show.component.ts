import { Component } from '@angular/core';
import { Contraventor } from '../../interfaces/contraventor.interface';
import { ContraventorService } from '../../services/contraventor.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent {

  contraventor!: Contraventor;
  loading = true;

  constructor(
    private contraventorService: ContraventorService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.contraventorService.getContraventor(id)))
      .subscribe((contraventor) => {
        this.contraventor = contraventor;
        this.loading = false;
        console.log(this.contraventor);
      });
  }
}
