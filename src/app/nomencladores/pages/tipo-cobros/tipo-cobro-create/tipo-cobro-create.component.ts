import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoCobro } from 'src/app/nomencladores/interfaces/tipo-cobro.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-cobro-create',
  templateUrl: './tipo-cobro-create.component.html',
  styleUrls: ['./tipo-cobro-create.component.css']
})
export class TipoCobroCreateComponent {
  conceptoTipoCobro!: TipoCobro;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    gestionado: [false],
    activo: [true],
  });

  crearTipoCobro() {

    if (this.formCrear.invalid || this.formCrear.untouched) {
      // El formulario es inválido o no se ha tocado
      Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Por favor, completa los campos requeridos',
        showConfirmButton: true,
      });
      return;
    }

    this.conceptoTipoCobro = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postTipoCobro(this.conceptoTipoCobro).subscribe(
      (conceptoTipoCobroCreado) => {
        this.conceptoTipoCobro = conceptoTipoCobroCreado;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Concepto de Cobro creado',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/tipo-cobro/:id', this.conceptoTipoCobro.id]);
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
