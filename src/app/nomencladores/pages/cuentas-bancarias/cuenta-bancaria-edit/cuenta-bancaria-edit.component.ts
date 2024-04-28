import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CuentaBancaria } from 'src/app/nomencladores/interfaces/cuenta-bancaria.interface';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta-bancaria-edit',
  templateUrl: './cuenta-bancaria-edit.component.html',
  styleUrls: ['./cuenta-bancaria-edit.component.css']
})
export class CuentaBancariaEditComponent {

  cuentaBancaria!: CuentaBancaria;
  monedas!: Moneda[]
  submitted = false;
  loading = true;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {

    this.activeRoute.params
      .pipe(
        switchMap(({ id }) => this.nomencladoresService.getCuentaBancaria( id ))
      )
      .subscribe((cuentaBancaria) => {
        this.cuentaBancaria = cuentaBancaria;
        this.loading = false;
        console.log(  this.cuentaBancaria );

        this.formEditar.patchValue({ 
          id_cuenta: cuentaBancaria.id_cuenta,
          nombre: cuentaBancaria.moneda,
          activo: cuentaBancaria.activo,
          moneda: cuentaBancaria.moneda.descripcion
         });
      });
      this.nomencladoresService.getMonedas().subscribe(
        (monedas)=>{
          this.monedas = monedas
        }
      )
  }

  formEditar: FormGroup = this.fb.group({
    id_cuenta: ['', Validators.required],
    nombre: ['', Validators.required],
    moneda: ['', Validators.required],
    activo: [true],
  });

  editarCuentaBancaria() {

    if ( this.formEditar.untouched ) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, modifique algún campo',
        showConfirmButton: true,
      });
      return;
    }

    const cuentaBancaria = this.formEditar.value;
    this.nomencladoresService.putCuentaBancaria( this.cuentaBancaria.id!, cuentaBancaria ).subscribe(
      (cuentaBancaria) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/cuentas-bancarias']);
      }
      // error => {
      //   console.log('Error:', error);
      //   if (error.error.message === 'Unauthenticated.') {
      //     Swal.fire({
      //       icon: 'error',
      //       title: '¡Tu sesión ha expirado!',
      //       text: 'Por favor, vuelve a iniciar sesión',
      //       showConfirmButton: false,
      //       timer: 1000 // Duración en milisegundos (1 segundo)
      //     }).then(() => {
      //       this.router.navigateByUrl('/auth/login');
      //     });
      //   }
      // }
    );
  }
}
