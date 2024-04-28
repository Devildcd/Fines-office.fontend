import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoOperacion } from 'src/app/nomencladores/interfaces/tipo-operacion.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-operacion-edit',
  templateUrl: './tipo-operacion-edit.component.html',
  styleUrls: ['./tipo-operacion-edit.component.css']
})
export class TipoOperacionEditComponent {

  tipoOperacion!: TipoOperacion;
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
        switchMap(({ id }) => this.nomencladoresService.getTipoOperacion( id ))
      )
      .subscribe((tipoOperacion) => {
        this.tipoOperacion = tipoOperacion;
        this.loading = false;
        console.log( tipoOperacion );

        this.formEditar.patchValue({ ...tipoOperacion });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarTipoOperacion() {

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

    const tipoOperacion = this.formEditar.value;
    this.nomencladoresService.putTipoDocumento( this.tipoOperacion.id!, tipoOperacion ).subscribe(
      (tipoOperacion) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de operación actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/tipos-operaciones']);
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
