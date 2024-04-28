import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MaxMinimporte } from 'src/app/nomencladores/interfaces/max-min-importe.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-max-min-importe-edit',
  templateUrl: './max-min-importe-edit.component.html',
  styleUrls: ['./max-min-importe-edit.component.css']
})
export class MaxMinImporteEditComponent {

  rangoImporte!: MaxMinimporte;
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
        switchMap(({ id }) => this.nomencladoresService.getRangoImporte( id ))
      )
      .subscribe((rangoImporte) => {
        this.rangoImporte = rangoImporte;
        this.loading = false;
        console.log( rangoImporte );

        this.formEditar.patchValue({ ...rangoImporte });
      });
  }


  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    minima: [0, Validators.required],
    maxima: [0, Validators.required],
    activo: [true],
  });

  editarRangoImporte() {

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

    const rangoImporte = this.formEditar.value;
    this.nomencladoresService.putRangoCantidad( this.rangoImporte.id!, rangoImporte ).subscribe(
      (rangoImporte) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/rangos-de-importes']);
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
