import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Municipio } from 'src/app/nomencladores/interfaces/municipio.interfaces';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-municipio-show',
  templateUrl: './municipio-show.component.html',
  styleUrls: ['./municipio-show.component.css']
})
export class MunicipioShowComponent {

  municipio!: Municipio;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getMunicipio( id ))
      )
      .subscribe((municipio) => {
        this.municipio = municipio;
        this.loading = false;
        console.log(  this.municipio );    
      });
  }

}
