import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Moneda } from 'src/app/nomencladores/interfaces/moneda.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-moneda-create',
  templateUrl: './moneda-create.component.html',
  styleUrls: ['./moneda-create.component.css']
})
export class MonedaCreateComponent {

  conceptoMoneda!: Moneda;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    id_moneda: ['', Validators.required],
    descripcion: ['', Validators.required],
    automatico: [false],
    activo: [true],
  });

  crearMoneda() {

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

    this.conceptoMoneda = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postMoneda(this.conceptoMoneda).subscribe(
      (conceptoMonedaCreado) => {
        this.conceptoMoneda = conceptoMonedaCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Moneda creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/moneda/:id', this.conceptoMoneda.id]);
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
