import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { TipoDocumento } from 'src/app/nomencladores/interfaces/tipo-documento.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-documento-edit',
  templateUrl: './tipo-documento-edit.component.html',
  styleUrls: ['./tipo-documento-edit.component.css']
})
export class TipoDocumentoEditComponent {

  tipoDocumento!: TipoDocumento;
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
        switchMap(({ id }) => this.nomencladoresService.getTipoDocumento( id ))
      )
      .subscribe((tipoDocumento) => {
        this.tipoDocumento = tipoDocumento;
        this.loading = false;
        console.log( tipoDocumento );

        this.formEditar.patchValue({ ...tipoDocumento });
      });
  }

  formEditar: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  editarTipoDocumento() {

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

    const tipoDocumento = this.formEditar.value;
    this.nomencladoresService.putTipoDocumento( this.tipoDocumento.id!, tipoDocumento ).subscribe(
      (tipoDocumento) => {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de documento actualizado',
          showConfirmButton: false,
        });
        setTimeout(() => {
          location.reload();
        }, 1000);
        this.router.navigate(['/nomencladores/divisiones/tipos-documentos']);
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
