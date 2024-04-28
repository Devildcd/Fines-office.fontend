import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SituacionLaboral } from 'src/app/nomencladores/interfaces/situacion-laboral.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-situacion-laboral-create',
  templateUrl: './situacion-laboral-create.component.html',
  styleUrls: ['./situacion-laboral-create.component.css']
})
export class SituacionLaboralCreateComponent {
  conceptoSituacionLaboral!: SituacionLaboral;
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

  crearSituacionLaboral() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos requeridos',
        showConfirmButton: true,
      });
      return;
    }

    this.conceptoSituacionLaboral = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postSituacionLaboral(this.conceptoSituacionLaboral).subscribe(
      (conceptoSituacionLaboralCreado) => {
        this.conceptoSituacionLaboral = conceptoSituacionLaboralCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Situacion de Laboral creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/situacion-laboral/:id', this.conceptoSituacionLaboral.id]);
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
