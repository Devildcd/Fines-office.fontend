import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-multa-edit',
  templateUrl: './tipo-multa-edit.component.html',
  styleUrls: ['./tipo-multa-edit.component.css']
})
export class TipoMultaEditComponent {

  tipoMulta!: TipoMulta;
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
        switchMap(({ id }) => this.nomencladoresService.getTipoMulta( id ))
      )
      .subscribe((tipoMulta) => {
        this.tipoMulta = tipoMulta;
        this.loading = false;
        console.log( tipoMulta );

        this.formEditar.patchValue({ ...tipoMulta });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    duplica: [],
    apremia: [],
    gestiona: [],
    activo: [true],
  });

  editarTipoMulta() {

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

    const tipoMulta = this.formEditar.value;
    this.nomencladoresService.putTipoMulta( this.tipoMulta.id!, tipoMulta ).subscribe(
      (tipoMulta) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de Multa actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/tipos-multas']);
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
