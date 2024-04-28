import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoCancelacion } from 'src/app/nomencladores/interfaces/concepto-cancelacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-cancelacion-edit',
  templateUrl: './concepto-cancelacion-edit.component.html',
  styleUrls: ['./concepto-cancelacion-edit.component.css']
})
export class ConceptoCancelacionEditComponent {

  conceptoCancelacion!: ConceptoCancelacion;
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
        switchMap(({ id }) => this.nomencladoresService.getConceptoCancelacion( id ))
      )
      .subscribe((conceptoCancelacion) => {
        this.conceptoCancelacion = conceptoCancelacion;
        this.loading = false;
        console.log( conceptoCancelacion );

        this.formEditar.patchValue({ ...conceptoCancelacion });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    cantidad_dias: [0, Validators.required],
    automatico: [false],
    activo: [true],
  });

  editarConceptoCancelacion() {

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

    const conceptoCancelacion = this.formEditar.value;
    this.nomencladoresService.putProvincia( this.conceptoCancelacion.id!, conceptoCancelacion ).subscribe(
      (conceptoCancelacion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Cancelación actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/conceptos-cancelacion']);
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
