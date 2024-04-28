import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Articulo } from 'src/app/nomencladores/interfaces/articulo.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-articulo-edit',
  templateUrl: './articulo-edit.component.html',
  styleUrls: ['./articulo-edit.component.css']
})
export class ArticuloEditComponent {
  articulo!: Articulo;
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
        switchMap(({ id }) => this.nomencladoresService.getArticulo( id ))
      )
      .subscribe((articulo) => {
        this.articulo = articulo;
        this.loading = false;
        console.log( articulo );

        this.formEditar.patchValue({ ...articulo });
      });
  }

  formEditar: FormGroup = this.fb.group({
    id_articulo: ['', Validators.required],
    activo: [true],
  });

  editarArticulo() {

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


    const articulo = this.formEditar.value;
    this.nomencladoresService.putArticulo( this.articulo.id!, articulo ).subscribe(
      (articulo) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Articulo actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/articulo']);
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
