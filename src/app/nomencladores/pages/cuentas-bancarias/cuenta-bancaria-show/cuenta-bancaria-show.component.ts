import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CuentaBancaria } from 'src/app/nomencladores/interfaces/cuenta-bancaria.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';

@Component({
  selector: 'app-cuenta-bancaria-show',
  templateUrl: './cuenta-bancaria-show.component.html',
  styleUrls: ['./cuenta-bancaria-show.component.css']
})
export class CuentaBancariaShowComponent {

  cuentaBancaria!: CuentaBancaria;
  loading = true;

  constructor( private nomencladoresService: NomencladoresService, 
               private activeRoute: ActivatedRoute ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getCuentaBancaria( id ))
      )
      .subscribe((cuentaBancaria) => {
        this.cuentaBancaria = cuentaBancaria;
        this.loading = false;
        console.log(  this.cuentaBancaria );    
      });
  }
}
