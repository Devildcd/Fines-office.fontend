import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { tipoOficina } from 'src/app/nomencladores/interfaces/tipo-oficina.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-oficina-edit',
  templateUrl: './tipo-oficina-edit.component.html',
  styleUrls: ['./tipo-oficina-edit.component.css']
})
export class TipoOficinaEditComponent {

  tipoOficina!: tipoOficina;
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
        switchMap(({ id }) => this.nomencladoresService.getTipoOficina( id ))
      )
      .subscribe((tipoOficina) => {
        this.tipoOficina = tipoOficina;
        this.loading = false;
        console.log( tipoOficina );

        this.formEditar.patchValue({ ...tipoOficina });
      });
  }

  formEditar: FormGroup = this.fb.group({
    identificador: ['', Validators.required],
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editartipoOficina() {

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

    const tipoOficina = this.formEditar.value;
    this.nomencladoresService.putTipoOficina( this.tipoOficina.id!, tipoOficina ).subscribe(
      (provincia) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de Oficina actualizada',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/tipoOficinas']);
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


