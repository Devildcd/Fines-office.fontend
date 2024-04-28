import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConceptoTraslado } from 'src/app/nomencladores/interfaces/concepto-traslado.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concepto-traslado-edit',
  templateUrl: './concepto-traslado-edit.component.html',
  styleUrls: ['./concepto-traslado-edit.component.css']
})
export class ConceptoTrasladoEditComponent {

  conceptoTraslado!: ConceptoTraslado;
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
        switchMap(({ id }) => this.nomencladoresService.getConceptoTraslado( id ))
      )
      .subscribe((conceptoTraslado) => {
        this.conceptoTraslado = conceptoTraslado;
        this.loading = false;
        console.log( conceptoTraslado );

        this.formEditar.patchValue({ ...conceptoTraslado });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    automatico: [false],
    activo: [true],
  });

  editarConceptoTraslado() {

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

    const conceptoTraslado = this.formEditar.value;
    this.nomencladoresService.putConceptoTraslado( this.conceptoTraslado.id!, conceptoTraslado ).subscribe(
      (conceptoTraslado) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Traslado actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/conceptos-traslado']);
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
