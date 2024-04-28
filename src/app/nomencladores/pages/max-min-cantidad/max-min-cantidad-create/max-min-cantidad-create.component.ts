import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaxMinCantidad } from 'src/app/nomencladores/interfaces/max-min-cantidad.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-max-min-cantidad-create',
  templateUrl: './max-min-cantidad-create.component.html',
  styleUrls: ['./max-min-cantidad-create.component.css']
})
export class MaxMinCantidadCreateComponent {

  rangoCantidad!: MaxMinCantidad;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    minima: [0, Validators.required],
    maxima: [0, Validators.required],
    activo: [true],
  });

  crearRangoCantidad() {

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

    this.rangoCantidad = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postRangoCantidad(this.rangoCantidad).subscribe(
      (rangoCantidadCreado) => {
        this.rangoCantidad = rangoCantidadCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/rango-de-cantidad', this.rangoCantidad.id]);
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
