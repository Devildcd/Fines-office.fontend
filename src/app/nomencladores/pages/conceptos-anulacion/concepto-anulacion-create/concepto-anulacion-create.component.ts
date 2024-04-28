import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptoAnulacion } from 'src/app/nomencladores/interfaces/concepto-anulacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-anulacion-create',
  templateUrl: './concepto-anulacion-create.component.html',
  styleUrls: ['./concepto-anulacion-create.component.css']
})
export class ConceptoAnulacionCreateComponent {

  conceptoAnulacion!: ConceptoAnulacion;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  crearConceptoAnulacion() {

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

    this.conceptoAnulacion = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postConceptoAnulacion(this.conceptoAnulacion).subscribe(
      (conceptoAnulacionCreado) => {
        this.conceptoAnulacion = conceptoAnulacionCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Anulación creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/concepto-anulacion', this.conceptoAnulacion.id]);
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
