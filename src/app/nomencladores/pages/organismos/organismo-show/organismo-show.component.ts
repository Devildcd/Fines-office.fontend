import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Organismo } from 'src/app/nomencladores/interfaces/organismo.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-organismo-show',
  templateUrl: './organismo-show.component.html',
  styleUrls: ['./organismo-show.component.css']
})
export class OrganismoShowComponent {

  organismo!: Organismo;
  loading = true;

  constructor(
    private nomencladoresService: NomencladoresService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activeRoute.params
      .pipe(switchMap(({ id }) => this.nomencladoresService.getOrganismo(id)))
      .subscribe((organismo) => {
        this.organismo = organismo;
        this.loading = false;
        console.log(this.organismo);
      });
  }
}
