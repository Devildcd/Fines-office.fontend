import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoAjuste } from 'src/app/nomencladores/interfaces/tipo-ajuste.inteface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-ajuste-edit',
  templateUrl: './tipo-ajuste-edit.component.html',
  styleUrls: ['./tipo-ajuste-edit.component.css']
})
export class TipoAjusteEditComponent {

  tipoAjuste!: TipoAjuste;
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
        switchMap(({ id }) => this.nomencladoresService.getTipoAjuste( id ))
      )
      .subscribe((tipoAjuste) => {
        this.tipoAjuste = tipoAjuste;
        this.loading = false;
        console.log( tipoAjuste );

        this.formEditar.patchValue({ ...tipoAjuste });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarTipoAjuste() {

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

    const tipoAjuste = this.formEditar.value;
    this.nomencladoresService.putTipoAjuste( this.tipoAjuste.id!, tipoAjuste ).subscribe(
      (tipoAjuste) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de Ajuste actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/tipos-ajustes']);
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
