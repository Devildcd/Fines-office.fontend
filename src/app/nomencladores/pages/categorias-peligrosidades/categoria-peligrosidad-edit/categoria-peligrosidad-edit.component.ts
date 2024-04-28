import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { CategoriaPeligrosidad } from 'src/app/nomencladores/interfaces/categoria-peligrosidad.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categoria-peligrosidad-edit',
  templateUrl: './categoria-peligrosidad-edit.component.html',
  styleUrls: ['./categoria-peligrosidad-edit.component.css']
})
export class CategoriaPeligrosidadEditComponent {
  categoriaPeligrosidad!: CategoriaPeligrosidad;
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
        switchMap(({ id }) => this.nomencladoresService.getCategoriaPeligrosidad( id ))
      )
      .subscribe((categoriaPeligrosidad) => {
        this.categoriaPeligrosidad = categoriaPeligrosidad;
        this.loading = false;
        console.log( categoriaPeligrosidad );

        this.formEditar.patchValue({ ...categoriaPeligrosidad });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarCategoriaPeligrosidad() {

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


    const categoriaPeligrosidad = this.formEditar.value;
    this.nomencladoresService.putCategoriaPeligrosidad( this.categoriaPeligrosidad.id!, categoriaPeligrosidad ).subscribe(
      (categoriaPeligrosidad) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Categoria de peligrosidad actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/categoria-peligrosidad']);
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
