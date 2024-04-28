import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaxMinimporte } from 'src/app/nomencladores/interfaces/max-min-importe.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-max-min-importes-create',
  templateUrl: './max-min-importes-create.component.html',
  styleUrls: ['./max-min-importes-create.component.css']
})
export class MaxMinImportesCreateComponent {

  rangoImporte!: MaxMinimporte;
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

  crearRangoImporte() {

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

    this.rangoImporte = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postRangoImporte(this.rangoImporte).subscribe(
      (rangoImporteCreado) => {
        this.rangoImporte = rangoImporteCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/rango-de-importe', this.rangoImporte.id]);
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
