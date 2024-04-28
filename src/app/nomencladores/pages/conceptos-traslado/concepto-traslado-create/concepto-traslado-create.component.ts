import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConceptoTraslado } from 'src/app/nomencladores/interfaces/concepto-traslado.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-traslado-create',
  templateUrl: './concepto-traslado-create.component.html',
  styleUrls: ['./concepto-traslado-create.component.css']
})
export class ConceptoTrasladoCreateComponent {

  conceptoTraslado!: ConceptoTraslado;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    automatico: [false],
    activo: [true],
  });

  crearConceptoTraslado() {

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

    this.conceptoTraslado = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postConceptoTraslado(this.conceptoTraslado).subscribe(
      (conceptoTrasladoCreado) => {
        this.conceptoTraslado = conceptoTrasladoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Traslado creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/concepto-traslado', this.conceptoTraslado.id]);
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
