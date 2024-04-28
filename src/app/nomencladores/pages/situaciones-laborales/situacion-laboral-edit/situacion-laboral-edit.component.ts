import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { SituacionLaboral } from 'src/app/nomencladores/interfaces/situacion-laboral.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-situacion-laboral-edit',
  templateUrl: './situacion-laboral-edit.component.html',
  styleUrls: ['./situacion-laboral-edit.component.css']
})
export class SituacionLaboralEditComponent {
  situacionLaboral!: SituacionLaboral;
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
        switchMap(({ id }) => this.nomencladoresService.getSituacionLaboral( id ))
      )
      .subscribe((situacionLaboral) => {
        this.situacionLaboral = situacionLaboral;
        this.loading = false;
        console.log( situacionLaboral );

        this.formEditar.patchValue({ ...situacionLaboral });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarSituacionLaboral() {

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

    const situacionLaboral = this.formEditar.value;
    this.nomencladoresService.putSituacionLaboral( this.situacionLaboral.id!, situacionLaboral ).subscribe(
      (situacionLaboral) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Situacion Laboral actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/situacion-laboral']);
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
