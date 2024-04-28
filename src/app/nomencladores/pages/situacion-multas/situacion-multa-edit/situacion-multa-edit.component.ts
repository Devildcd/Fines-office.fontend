import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SituacionMulta } from 'src/app/nomencladores/interfaces/situacion-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-situacion-multa-edit',
  templateUrl: './situacion-multa-edit.component.html',
  styleUrls: ['./situacion-multa-edit.component.css']
})
export class SituacionMultaEditComponent {

  sitMulta!: SituacionMulta;
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
        switchMap(({ id }) => this.nomencladoresService.getSituacionMulta( id ))
      )
      .subscribe((sitMulta) => {
        this.sitMulta = sitMulta;
        this.loading = false;
        console.log( sitMulta );

        this.formEditar.patchValue({ ...sitMulta });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarSituacionMulta() {

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

    const sitMulta = this.formEditar.value;
    this.nomencladoresService.putSituacionMulta( this.sitMulta.id!, sitMulta ).subscribe(
      (sitMulta) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/situaciones-multas']);
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
