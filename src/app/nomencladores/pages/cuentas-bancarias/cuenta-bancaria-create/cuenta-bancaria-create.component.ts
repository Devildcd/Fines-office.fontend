import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CuentaBancaria } from 'src/app/nomencladores/interfaces/cuenta-bancaria.interface';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cuenta-bancaria-create',
  templateUrl: './cuenta-bancaria-create.component.html',
  styleUrls: ['./cuenta-bancaria-create.component.css']
})
export class CuentaBancariaCreateComponent {

  cuentaBancaria!: CuentaBancaria;
  monedas!:Moneda[]


  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  ngOnInit(){
    this.nomencladoresService.getMonedas().subscribe(
      (monedas)=>{
        this.monedas = monedas;
      }
    )
  }

  formCrear: FormGroup = this.fb.group({
    id_cuenta: ['', Validators.required],
    nombre: ['', Validators.required],
    moneda: ['', Validators.required],
    activo: [true],
  });

  crearCuentaBancaria() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos con *',
        showConfirmButton: true,
      });
      return;
    }

    this.cuentaBancaria = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postCuentaBancaria(this.cuentaBancaria).subscribe(
      (cuentaBancariaCreada) => {
        console.log(cuentaBancariaCreada)
        this.cuentaBancaria = cuentaBancariaCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/cuenta-bancaria', this.cuentaBancaria.id]);
        }, 1000);
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
