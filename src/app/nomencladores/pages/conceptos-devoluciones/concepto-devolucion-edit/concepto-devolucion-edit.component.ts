import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoDevolucion } from 'src/app/nomencladores/interfaces/concepto-devolucion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-devolucion-edit',
  templateUrl: './concepto-devolucion-edit.component.html',
  styleUrls: ['./concepto-devolucion-edit.component.css']
})
export class ConceptoDevolucionEditComponent {

  conceptoDevolucion!: ConceptoDevolucion;
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
        switchMap(({ id }) => this.nomencladoresService.getConceptoDevolucion( id ))
      )
      .subscribe((conceptoDevolucion) => {
        this.conceptoDevolucion = conceptoDevolucion;
        this.loading = false;
        console.log( conceptoDevolucion );

        this.formEditar.patchValue({ ...conceptoDevolucion });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    automatico: [false],
    activo: [true],
  });

  editarConceptoDevolucion() {

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

    const conceptoDevolucion = this.formEditar.value;
    this.nomencladoresService.putConceptoTraslado( this.conceptoDevolucion.id!, conceptoDevolucion ).subscribe(
      (conceptoDevolucion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Devolución actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/conceptos-devoluciones']);
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
