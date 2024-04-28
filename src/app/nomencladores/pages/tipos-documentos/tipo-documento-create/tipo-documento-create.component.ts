import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoDocumento } from 'src/app/nomencladores/interfaces/tipo-documento.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-documento-create',
  templateUrl: './tipo-documento-create.component.html',
  styleUrls: ['./tipo-documento-create.component.css']
})
export class TipoDocumentoCreateComponent {

  tipoDocumento!: TipoDocumento;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    activo: [true],
  });

  crearTipoDocumento() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos con *',
        showConfirmButton: true,
      });
      return;
    }

    this.tipoDocumento = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postTipoDocumento(this.tipoDocumento).subscribe(
      (tipoDocumentoCreado) => {
        this.tipoDocumento = tipoDocumentoCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/tipo-documento', this.tipoDocumento.id]);
        }, 1000);
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
