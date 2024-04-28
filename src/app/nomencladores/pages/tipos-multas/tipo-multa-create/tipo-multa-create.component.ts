import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TipoMulta } from 'src/app/nomencladores/interfaces/tipo-multa.interface';
import { NomencladoresService } from 'src/app/nomencladores/services/nomencladores.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-multa-create',
  templateUrl: './tipo-multa-create.component.html',
  styleUrls: ['./tipo-multa-create.component.css']
})
export class TipoMultaCreateComponent {

  tipoMulta!: TipoMulta;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private nomencladoresService: NomencladoresService,
    private router: Router
  ) {}

  formCrear: FormGroup = this.fb.group({
    descripcion: ['', Validators.required],
    duplica: [false],
    apremia: [false],
    gestiona: [false],
    activo: [true],
  });

  crearTipoMulta() {

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

    this.tipoMulta = {
      ...this.formCrear.value,
    };
    this.nomencladoresService.postTipoMulta(this.tipoMulta).subscribe(
      (tipoMultaCreada) => {
        this.tipoMulta = tipoMultaCreada;
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Tipo de Multa creada',
          showConfirmButton: false,
          timer: 1000,
        });
        setTimeout(() => {
          this.router.navigate(['/nomencladores/divisiones/detalles/tipo-multa', this.tipoMulta.id]);
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
