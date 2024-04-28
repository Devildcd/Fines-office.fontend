import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Calle } from 'src/app/nomencladores/interfaces/calles.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calle-edit',
  templateUrl: './calle-edit.component.html',
  styleUrls: ['./calle-edit.component.css']
})
export class CalleEditComponent {

  calle!: Calle;
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
        switchMap(({ id }) => this.nomencladoresService.getCalle( id ))
      )
      .subscribe((calle) => {
        this.calle = calle;
        this.loading = false;
        console.log( calle );

        this.formEditar.patchValue({ ...calle });
      });
  }

  formEditar: FormGroup = this.fb.group({
    id_calle: ['', Validators.required],
    activo: [true],
  });

  editarCalle() {

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

    const calle = this.formEditar.value;
    this.nomencladoresService.putCalle( this.calle.id!, calle ).subscribe(
      (calle) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Calle actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/calles']);
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
