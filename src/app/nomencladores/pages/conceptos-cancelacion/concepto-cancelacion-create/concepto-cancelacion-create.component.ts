import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptoCancelacion } from 'src/app/nomencladores/interfaces/concepto-cancelacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-cancelacion-create',
  templateUrl: './concepto-cancelacion-create.component.html',
  styleUrls: ['./concepto-cancelacion-create.component.css']
})
export class ConceptoCancelacionCreateComponent {

  conceptoCancelacion!: ConceptoCancelacion;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    cantidad_dias: [0, Validators.required],
    automatico: [false],
    activo: [true],
  });

  crearConceptoCancelacion() {

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

    this.conceptoCancelacion = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postConceptoCancelacion(this.conceptoCancelacion).subscribe(
      (conceptoCancelacionCreado) => {
        this.conceptoCancelacion = conceptoCancelacionCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto Cancelacion creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/concepto-cancelacion', this.conceptoCancelacion.id]);
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
