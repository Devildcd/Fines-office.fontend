import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoAnulacion } from 'src/app/nomencladores/interfaces/concepto-anulacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-anulacion-edit',
  templateUrl: './concepto-anulacion-edit.component.html',
  styleUrls: ['./concepto-anulacion-edit.component.css']
})
export class ConceptoAnulacionEditComponent {

  conceptoAnulacion!: ConceptoAnulacion;
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
        switchMap(({ id }) => this.nomencladoresService.getConceptoAnulacion( id ))
      )
      .subscribe((conceptoAnulacion) => {
        this.conceptoAnulacion = conceptoAnulacion;
        this.loading = false;
        console.log( conceptoAnulacion );

        this.formEditar.patchValue({ ...conceptoAnulacion });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarConceptoAnulacion() {

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

    const conceptoAnulacion = this.formEditar.value;
    this.nomencladoresService.putProvincia( this.conceptoAnulacion.id!, conceptoAnulacion ).subscribe(
      (conceptoAnulacion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Anulación actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/conceptos-anulacion']);
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
