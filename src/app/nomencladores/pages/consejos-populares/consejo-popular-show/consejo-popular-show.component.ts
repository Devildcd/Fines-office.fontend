import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConsejoPopular } from 'src/app/nomencladores/interfaces/consejo-popular.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-consejo-popular-show',
  templateUrl: './consejo-popular-show.component.html',
  styleUrls: ['./consejo-popular-show.component.css']
})
export class ConsejoPopularShowComponent {

  cpopular!: ConsejoPopular;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getConsejoPopular( id ))
      )
      .subscribe((cpopular) => {
        this.cpopular = cpopular;
        this.loading = false;
        console.log(  this.cpopular );
      });
  }

}
